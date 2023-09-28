pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Module} from "../Module.sol";
import {IMembership} from "../interfaces/IMembership.sol";
import {IModulePayroll} from "../interfaces/IModulePayroll.sol";

contract Payroll is Module, IModulePayroll {
    using Strings for uint256;
    using Address for address payable;

    struct PayrollDetail {
        uint256 amount;
        PayrollPeriod period;
        PayrollType payType;
        TokenDetail tokens;
    }

    struct TokenDetail {
        address[] addresses;
        uint256[] amounts;
    }

    struct PayrollKeys {
        uint256 memberId;
        PayrollPeriod period;
    }

    mapping(uint256 => mapping(PayrollPeriod => PayrollDetail[])) private _payrolls;
    mapping(bytes32 => PayrollKeys) private _payrollIds;
    string[] private _payrollTypes = [
        "Salary",
        "Bonus",
        "Commission",
        "Dividend",
        "Other"
    ];
    string[] private _payrollPeriods = [
        "Monthly",
        "Quarterly",
        "Yearly",
        "OneTime"
    ];

    constructor(
        address membership,
        uint256[] memory operators,
        uint256 delay
    ) Module("Payroll", "Payroll Module V1", membership, operators, delay) {}

    function getPayrollDetails(
        uint256 memberId,
        PayrollPeriod period
    ) public view returns (PayrollDetail[] memory) {
        return _payrolls[memberId][period];
    }

    function addPayrollDetail(
        uint256 memberId,
        PayrollDetail calldata payrollDetail
    ) public onlyOperator {
        _payrolls[memberId][payrollDetail.period].push(payrollDetail);
        emit PayrollAdded(memberId, payrollDetail);
    }

    function schedulePayroll(
        uint256 memberId,
        PayrollPeriod period
    ) public onlyOperator returns (bytes32 proposalId) {
        PayrollDetail[] memory payrolls = getPayrollDetails(memberId, period);
        address[] memory targets = new address[](payrolls.length);
        uint256[] memory values = new uint256[](payrolls.length);
        bytes[] memory calldatas = new bytes[](payrolls.length);
        string memory description = string(
            abi.encodePacked(
                _payrollPeriods[uint256(period)],
                " Payroll for #",
                memberId.toString(),
                " (",
                _payrollTypes[uint256(payrolls[0].payType)],
                ") ",
                "@",
                block.timestamp.toString()
            )
        );

        address memberWallet = getAddressByMemberId(memberId);

        for (uint256 i = 0; i < payrolls.length; ++i) {
            PayrollDetail memory payrollDetail = payrolls[i];
            targets[i] = address(this);
            values[i] = payrollDetail.amount;

            calldatas[i] = abi.encodeWithSignature(
                "execTransfer(uint256,address,address[],uint256[])",
                memberId,
                memberWallet,
                payrollDetail.tokens.addresses,
                payrollDetail.tokens.amounts
            );
        }

        bytes32 referId = keccak256(abi.encode(memberId, period));
        _payrollIds[referId] = PayrollKeys(memberId, period);
        proposalId = propose(
            targets,
            values,
            calldatas,
            description,
            referId
        );

        emit PayrollScheduled(memberId, proposalId);
    }

    function _beforeExecute(
        bytes32 id,
        bytes32 referId
    ) internal virtual override {
        super._beforeExecute(id, referId);

        PayrollKeys memory keys = _payrollIds[referId];
        PayrollDetail[] memory payrolls = _payrolls[keys.memberId][keys.period];
        uint256 ethAmount;
        uint256 balance = address(timelock).balance;
        address[] memory tokens;
        uint256[] memory amounts;

        for (uint256 i = 0; i < payrolls.length; ++i) {
            PayrollDetail memory payrollDetail = payrolls[i];
            ethAmount += payrollDetail.amount;
        }

        pullPayments(balance < ethAmount ? ethAmount - balance : 0, tokens, amounts);
    }

    function execTransfer(
        uint256 memberId,
        address payable account,
        address[] calldata tokens,
        uint256[] calldata amounts
    ) external payable onlyTimelock {
        if (msg.value > 0) {
            account.sendValue(msg.value);
        }

        for (uint256 i = 0; i < tokens.length; i++) {
            if (IERC20(tokens[i]).balanceOf(address(timelock)) >= amounts[i]) {
                IERC20(tokens[i]).transferFrom(
                    address(timelock),
                    address(account),
                    amounts[i]
                );
            }
        }

        emit PayrollExecuted(account, memberId, msg.value);
    }
}
