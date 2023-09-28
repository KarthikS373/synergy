pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {Module} from "../core/Module.sol";
import {IModulePayroll} from "../interfaces/IModulePayroll.sol";
import {IModuleOKR} from "../interfaces/IModuleOKR.sol";

contract OKR is Module, IModuleOKR {
    using Strings for uint256;
    using Address for address payable;

    struct OKRDetail {
        bytes description;
        IModulePayroll.PayrollDetail reward;
    }

    struct OKRKeys {
        uint256 memberId;
        uint64 year;
        uint64 quarter;
    }

    mapping(uint256 => mapping(uint64 => OKRDetail[])) private _okrs;
    mapping(bytes32 => OKRKeys) private _okrIds;

    constructor(
        address membership,
        uint256[] memory operators,
        uint256 delay
    ) Module("OKR", "OKR Module V1", membership, operators, delay) {}

    function addOKR(
        uint64 _year,
        uint64 _quarter,
        bytes calldata _description,
        IModulePayroll.PayrollDetail calldata _reward
    ) external {
        uint256 memberId = getMembershipTokenId(_msgSender());
        OKRDetail memory okr = OKRDetail(_description, _reward);
        _okrs[memberId][_year][_quarter] = okr;
        emit OKRAdded(memberId, okr);
    }

    function scheduleOKR(
        uint256 _memberId,
        uint64 _year,
        uint64 _quarter
    ) public onlyOperator returns (bytes32 _proposalId) {
        OKRDetail memory okr = _okrs[_memberId][_year][_quarter];
        address[] memory targets = new address[](1);
        uint256[] memory values = new uint256[](1);
        bytes[] memory calldatas = new bytes[](1);
        string memory description = string(
            abi.encodePacked(
                _year,
                " ",
                _quarter,
                " OKR for #",
                _memberId.toString(),
                "@",
                block.timestamp.toString()
            )
        );

        address memberWallet = getAddressByMemberId(_memberId);

        targets[0] = address(this);
        values[0] = okr.reward.amount;

        calldatas[0] = abi.encodeWithSignature(
            "execTransfer(uint256,address,address[],uint256[])",
            _memberId,
            memberWallet,
            okr.reward.tokens.addresses,
            okr.reward.tokens.amounts
        );

        bytes32 _referId = keccak256(abi.encode(_memberId, _year, _quarter));
        _okrIds[_referId] = OKRKeys(_memberId, _year, _quarter);
        _proposalId = propose(
            targets,
            values,
            calldatas,
            description,
            _referId
        );

        emit OKRScheduled(_memberId, _proposalId);
    }

    function _beforeExecute(
        bytes32 _id,
        bytes32 _referId
    ) internal virtual override {
        super._beforeExecute(_id, _referId);

        OKRKeys memory _keys = _okrIds[_referId];
        OKRDetail memory okr = _okrs[_keys.memberId][_keys.year][_keys.quarter];
        uint256 _eth;
        uint256 _balance = address(timelock).balance;
        address[] memory _tokens;
        uint256[] memory _amounts;

        _eth += okr.reward.amount;

        pullPayments(_balance < _eth ? _eth - _balance : 0, _tokens, _amounts);
    }

    function execTransfer(
        uint256 _memberId,
        address payable _account,
        address[] calldata _tokens,
        uint256[] calldata _amounts
    ) external payable onlyTimelock {
        if (msg.value > 0) {
            _account.sendValue(msg.value);
        }

        for (uint256 i = 0; i < _tokens.length; i++) {
            if (
                IERC20(_tokens[i]).balanceOf(address(timelock)) >= _amounts[i]
            ) {
                IERC20(_tokens[i]).transferFrom(
                    address(timelock),
                    address(_account),
                    _amounts[i]
                );
            }
        }

        emit RewardExecuted(_account, _memberId, msg.value);
    }
}
