pragma solidity ^0.8.0;

library DataTypes {
    struct BaseToken {
        string name;
        string symbol;
    }

    struct GovernorSettings {
        uint256 votingDelay;
        uint256 votingPeriod;
        uint256 quorumNumerator;
        uint256 proposalThreshold;
    }

    struct InvestmentSettings {
        bool enableInvestment;
        uint256 investThresholdInETH;
        uint256 investRatioInETH;
        address[] investInERC20;
        uint256[] investThresholdInERC20;
        uint256[] investRatioInERC20;
    }

    struct ShareSplit {
        uint8 members;
        uint8 investors;
        uint8 market;
        uint8 reserved;
    }

    struct ShareSettings {
        GovernorSettings governor;
        uint256 initialSupply;
        ShareSplit initialSplit;
    }

    struct MembershipSettings {
        GovernorSettings governor;
        bool enableMembershipTransfer;
        string baseTokenURI;
        string contractURI;
    }

    struct DAOSettings {
        uint256 timelockDelay;
        ShareSettings share;
        MembershipSettings membership;
        InvestmentSettings investment;
    }

    enum ProposalStatus {
        Pending,
        Scheduled,
        Executed
    }

    struct MicroProposal {
        ProposalStatus status;
        uint256 confirmations;
        address[] targets;
        uint256[] values;
        bytes[] calldatas;
        string description;
        bytes32 referId;
    }

    struct ModulePayment {
        bool approved;
        uint256 ethAmount;
        mapping(address => uint256) erc20Amounts;
        uint256 expiredAt;
    }
}
