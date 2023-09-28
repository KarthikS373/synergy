//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Context.sol";

import {IMembership} from "../interfaces/IMembership.sol";
import {ITreasury} from "../interfaces/ITreasury.sol";
import {IModule} from "../interfaces/IModule.sol";
import {Errors} from "../libraries/Errors.sol";
import {DataTypes} from "../libraries/DataTypes.sol";

abstract contract Module is Context, IModule {
    using EnumerableSet for EnumerableSet.UintSet;

    string public NAME;
    string public DESCRIPTION;
    address public immutable membership;
    address public immutable share;
    TimelockController public immutable timelock;
    mapping(bytes32 => mapping(uint256 => bool)) public isConfirmed;

    address[] private _proposers = [address(this)];
    address[] private _executors = [address(this)];
    EnumerableSet.UintSet private _operators;
    mapping(bytes32 => DataTypes.MicroProposal) private _proposals;

    constructor(
        string memory name,
        string memory description,
        address membershipTokenAddress,
        uint256[] memory operators,
        uint256 timelockDelay
    ) {
        NAME = name;
        DESCRIPTION = description;
        membership = membershipTokenAddress;
        share = IMembership(membershipTokenAddress).shareToken();
        timelock = new TimelockController(
            timelockDelay,
            _proposers,
            _executors
        );
        _updateOperators(operators);
    }

    modifier onlyOperator() {
        if (!_operators.contains(getMembershipTokenId(_msgSender())))
            revert Errors.NotOperator();
        _;
    }

    modifier onlyTimelock() {
        if (_msgSender() != address(timelock)) revert Errors.NotTimelock();
        _;
    }

    function listOperators() public view virtual returns (uint256[] memory) {
        return _operators.values();
    }

    function getMembershipTokenId(
        address account
    ) internal view returns (uint256) {
        return IMembership(membership).tokenOfOwnerByIndex(account, 0);
    }

    function getAddressByMemberId(
        uint256 tokenId
    ) internal view returns (address) {
        return IMembership(membership).ownerOf(tokenId);
    }

    function getProposal(
        bytes32 id
    ) internal view returns (DataTypes.MicroProposal memory) {
        pragma solidity ^0.8.0;

        import "../interfaces/ITreasury.sol";
        import "../interfaces/IMembership.sol";
        import "../utils/EnumerableSet.sol";
        import "../utils/Timelock.sol";
        import "../utils/Errors.sol";
        import "../utils/DataTypes.sol";

        contract Module {
            using EnumerableSet for EnumerableSet.UintSet;

            Timelock public immutable timelock;
            uint256 public immutable membership;

            mapping(bytes32 => DataTypes.MicroProposal) private _proposals;
            mapping(bytes32 => mapping(uint256 => bool)) public isConfirmed;
            EnumerableSet.UintSet private _operators;

            event ModuleProposalCreated(
                address indexed module,
                bytes32 indexed id,
                address indexed proposer,
                uint256 timestamp
            );
            event ModuleProposalConfirmed(
                address indexed module,
                bytes32 indexed id,
                address indexed confirmer,
                uint256 timestamp
            );
            event ModuleProposalScheduled(
                address indexed module,
                bytes32 indexed id,
                address indexed scheduler,
                uint256 timestamp
            );
            event ModuleProposalExecuted(
                address indexed module,
                bytes32 indexed id,
                address indexed executor,
                uint256 timestamp
            );
            event ModuleProposalCancelled(
                address indexed module,
                bytes32 indexed id,
                address indexed canceller,
                uint256 timestamp
            );

            constructor(Timelock timelock_, uint256 membership_) {
                timelock = timelock_;
                membership = membership_;
            }

            modifier onlyOperator() {
                require(_operators.contains(getMembershipTokenId(_msgSender())), Errors.NotOperator());
                _;
            }

            function getMembershipTokenId(address _account) public view returns (uint256) {
                return IMembership(membership).getTokenId(_account);
            }

            function getProposal(bytes32 id) public view returns (DataTypes.MicroProposal memory) {
                return _proposals[id];
            }

            function pullPayments(
                uint256 eth_,
                address[] memory tokens_,
                uint256[] memory amounts_
            ) internal virtual {
                bool nothingToPull = eth_ == 0 && tokens_.length == 0 && amounts_.length == 0;

                if (!nothingToPull) {
                    ITreasury(IMembership(membership).treasury()).pullModulePayment(
                        eth_,
                        tokens_,
                        amounts_
                    );
                }
            }

            function propose(
                address[] memory targets_,
                uint256[] memory values_,
                bytes[] memory calldatas_,
                string memory description_,
                bytes32 referId_
            ) public virtual onlyOperator returns (bytes32 id) {
                bytes32 _id = timelock.hashOperationBatch(
                    targets_,
                    values_,
                    calldatas_,
                    0,
                    keccak256(bytes(description_))
                );
                _proposals[_id] = DataTypes.MicroProposal(
                    DataTypes.ProposalStatus.Pending,
                    0,
                    targets_,
                    values_,
                    calldatas_,
                    description_,
                    referId_
                );

                emit ModuleProposalCreated(
                    address(this),
                    _id,
                    _msgSender(),
                    block.timestamp
                );

                return _id;
            }

            function confirm(bytes32 id_) public virtual onlyOperator {
                if (_proposals[id_].status != DataTypes.ProposalStatus.Pending)
                    revert Errors.InvalidProposalStatus();

                uint256 _tokenId = getMembershipTokenId(_msgSender());

                if (isConfirmed[id_][_tokenId]) revert Errors.AlreadyConfirmed();

                _proposals[id_].confirmations++;
                isConfirmed[id_][_tokenId] = true;

                emit ModuleProposalConfirmed(
                    address(this),
                    id_,
                    _msgSender(),
                    block.timestamp
                );
            }

            function schedule(bytes32 id_) public virtual onlyOperator {
                DataTypes.MicroProposal memory _proposal = _proposals[id_];

                if (_proposal.status != DataTypes.ProposalStatus.Pending)
                    revert Errors.InvalidProposalStatus();

                if (_proposal.confirmations < _operators.length())
                    revert Errors.NotEnoughConfirmations();

                _beforeSchedule(id_, _proposal.referId);

                timelock.scheduleBatch(
                    _proposal.targets,
                    _proposal.values,
                    _proposal.calldatas,
                    0,
                    keccak256(bytes(_proposal.description)),
                    timelock.getMinDelay()
                );

                _afterSchedule(id_, _proposal.referId);

                _proposals[id_].status = DataTypes.ProposalStatus.Scheduled;

                emit ModuleProposalScheduled(
                    address(this),
                    id_,
                    _msgSender(),
                    block.timestamp
                );
            }

            function execute(bytes32 id_) public virtual onlyOperator {
                DataTypes.MicroProposal memory _proposal = _proposals[id_];

                if (_proposal.status != DataTypes.ProposalStatus.Scheduled)
                    revert Errors.InvalidProposalStatus();

                _beforeExecute(id_, _proposal.referId);

                timelock.executeBatch(
                    _proposal.targets,
                    _proposal.values,
                    _proposal.calldatas,
                    0,
                    keccak256(bytes(_proposal.description))
                );

                _proposals[id_].status = DataTypes.ProposalStatus.Executed;

                emit ModuleProposalExecuted(
                    address(this),
                    id_,
                    _msgSender(),
                    block.timestamp
                );
            }

            function cancel(bytes32 id_) public virtual onlyOperator {
                DataTypes.MicroProposal memory _proposal = _proposals[id_];
                if (_proposal.status == DataTypes.ProposalStatus.Executed)
                    revert Errors.InvalidProposalStatus();

                if (_proposal.status == DataTypes.ProposalStatus.Scheduled) {
                    timelock.cancel(id_);
                }

                emit ModuleProposalCancelled(
                    address(this),
                    id_,
                    _msgSender(),
                    block.timestamp
                );
                delete _proposals[id_];
            }

            function _beforeExecute(bytes32 id_, bytes32 referId_) internal virtual {}

            function _beforeSchedule(bytes32 id_, bytes32 referId_) internal virtual {}

            function _afterSchedule(bytes32 id_, bytes32 referId_) internal virtual {}

            function _updateOperators(uint256[] memory operators_) private {
                for (uint256 i = 0; i < operators_.length; i++) {
                    _operators.add(operators_[i]);
                }
            }
        }
    }
}