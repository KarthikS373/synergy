pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import {Module} from "../core/Module.sol";
import {IMembership} from "../interfaces/IMembership.sol";
import {IShare} from "../interfaces/IShare.sol";
import {Errors} from "../libraries/Errors.sol";
import {IModuleOptions} from "../interfaces/IModuleOptions.sol";

contract Options is Module, IModuleOptions {
    using Strings for uint256;

    struct VestingDetail {
        uint256 amount;
        uint64 startAt;
        uint64 duration;
    }

    struct VestingKeys {
        uint256 memberId;
        uint256 index;
    }

    mapping(uint256 => VestingDetail[]) private _memberOptions;
    mapping(bytes32 => VestingKeys) private _optionsKeys;
    mapping(uint256 => uint256) private _releasedAmount;

    constructor(
        address membership,
        uint256[] memory operators,
        uint256 delay
    ) Module("Options", "Options Module V1", membership, operators, delay) {}

    function releasedAmount(
        uint256 _memberId
    ) public view virtual returns (uint256) {
        return _releasedAmount[_memberId];
    }

    function scheduleOptions(
        uint256 _memberId,
        VestingDetail calldata _options
    ) public onlyOperator returns (bytes32 _proposalId) {
        address[] memory targets = new address[](1);
        uint256[] memory values = new uint256[](1);
        bytes[] memory calldatas = new bytes[](1);
        string memory description = string(
            abi.encodePacked(
                _options.amount,
                " Options for #",
                _memberId.toString(),
                "@",
                block.timestamp.toString()
            )
        );

        targets[0] = address(this);
        values[0] = 0;

        calldatas[0] = abi.encodeWithSignature(
            "addVestingPlan(uint256,uint256,uint64,uint64)",
            _memberId,
            _options.amount,
            _options.startAt,
            _options.duration
        );

        bytes32 _referId = keccak256(abi.encode(_memberId));
        _optionsKeys[_referId] = VestingKeys(_memberId, 0);
        _proposalId = propose(
            targets,
            values,
            calldatas,
            description,
            _referId
        );

        emit OptionsScheduled(_memberId, _proposalId);
    }

    function addVestingPlan(
        uint256 _memberId,
        uint256 _amount,
        uint64 _startAt,
        uint64 _duration
    ) external payable onlyTimelock {
        uint256 _balance = IShare(share).balanceOf(address(this));

        if (_balance < _amount) {
            address[] memory tokens = new address[](1);
            uint256[] memory amounts = new uint256[](1);
            tokens[0] = share;
            amounts[0] = _amount - _balance;
            pullPayments(0, tokens, amounts);
        }

        VestingDetail memory _vesting = VestingDetail(
            _amount,
            _startAt,
            _duration
        );
        _memberOptions[_memberId].push(_vesting);
        emit OptionsAdded(_memberId, _vesting);
    }

    function release() public {
        if (IMembership(membership).balanceOf(_msgSender()) == 0)
            revert Errors.NotMember();

        uint256 _memberId = getMembershipTokenId(_msgSender());

        if (_memberOptions[_memberId].length == 0) revert NoOptions();

        uint256 _releasableAmount = vestedAmount(
            _memberId,
            uint64(block.timestamp)
        ) - releasedAmount(_memberId);

        _releasedAmount[_memberId] += _releasableAmount;
        emit OptionsReleased(_memberId, _releasableAmount);

        IShare(share).transfer(_msgSender(), _releasableAmount);
    }

    function vestedAmount(
        uint256 _memberId,
        uint64 _timestamp
    ) public view returns (uint256 _amount) {
        uint256 _balance = IShare(share).balanceOf(address(this));

        for (uint256 i = 0; i < _memberOptions[_memberId].length; i++) {
            _amount += _vestingSchedule(
                _memberOptions[_memberId][i],
                _balance + releasedAmount(_memberId),
                _timestamp
            );
        }
    }

    function _vestingSchedule(
        VestingDetail memory _options,
        uint256 _totalAllocation,
        uint64 _timestamp
    ) private pure returns (uint256) {
        if (_timestamp < _options.startAt) {
            return 0;
        } else if (_timestamp > _options.startAt + _options.duration) {
            return _totalAllocation;
        } else {
            return (_totalAllocation * (_timestamp - _options.startAt));
            _options.duration;
        }
    }
}
