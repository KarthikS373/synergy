//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

import {FractionalInvestment} from "./FractionalInvestment.sol";
import {Errors} from "./libraries/Errors.sol";
import {DataTypes} from "./libraries/DataTypes.sol";

contract ProjectGovernance is
    Governor,
    GovernorSettings,
    GovernorCompatibilityBravo,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    constructor(
        string memory _name,
        address _token,
        FractionalInvestment _investment,
        DataTypes.GovernorSettings memory _settings
    )
        Governor(_name)
        GovernorSettings(
            _settings.votingDelay,
            _settings.votingPeriod,
            _settings.proposalThreshold
        )
        GovernorVotes(IVotes(_token))
        GovernorVotesQuorumFraction(settings.quorumNumerator)
        GovernorTimelockControl(_investment)
    {}

    function castVote(
        uint256 _proposalId,
        address _account,
        uint8 _support,
        string memory _reason
    ) internal override returns (uint256) {
        if (getVotes(msg.sender, block.number - 1) < proposalThreshold())
            revert Errors.VotesBelowProposalThreshold();

        return super._castVote(_proposalId, _account, _support, _reason);
    }

    function calculateQuorumFraction(
        uint256 _blockNumber
    )
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(_blockNumber);
    }

    function countVotes(
        address _account,
        uint256 _blockNumber
    ) public view override(Governor, IGovernor) returns (uint256) {
        return super.getVotes(_account, _blockNumber);
    }

    function state(
        uint256 _proposalId
    )
        public
        view
        override(Governor, IGovernor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(_proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function propose(
        address[] memory _targets,
        uint256[] memory _values,
        bytes[] memory _calldatas,
        string memory _description
    )
        public
        override(Governor, GovernorCompatibilityBravo, IGovernor)
        returns (uint256)
    {
        return super.propose(_targets, _values, _calldatas, _description);
    }

    function execute(
        uint256 _proposalId,
        address[] memory _targets,
        uint256[] memory _values,
        bytes[] memory _calldatas,
        bytes32 _descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(
            _proposalId,
            _targets,
            _values,
            _calldatas,
            _descriptionHash
        );
    }

    function cancel(
        address[] memory _targets,
        uint256[] memory _values,
        bytes[] memory _calldatas,
        bytes32 _descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(_targets, _values, _calldatas, _descriptionHash);
    }

    function executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(Governor, IERC165, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
