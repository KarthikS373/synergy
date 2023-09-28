const fs = require("fs");

const { utils } = require("ethers");
const { isAddress, getAddress, formatUnits, parseUnits } = utils;

module.exports.testArgs = function () {
  return [
    {
      name: "CodeforDAO",
      symbol: "CODE",
    },
    {
      name: "CodeforDAOShare",
      symbol: "CFD",
    },
    {
      timelockDelay: 1,
      share: {
        initialSupply: 1000000,
        initialSplit: {
          members: 20,
          investors: 10,
          market: 30,
          reserved: 40,
        },
        governor: {
          votingDelay: 1000,
          votingPeriod: 10000,
          quorumNumerator: 4,
          proposalThreshold: 100,
        },
      },
      membership: {
        governor: {
          votingDelay: 0,
          votingPeriod: 2,
          quorumNumerator: 3,
          proposalThreshold: 1,
        },
        enableMembershipTransfer: false,
        baseTokenURI: "",
        contractURI: "",
      },
      investment: {
        investThresholdInETH: 1,
        investRatioInETH: 2,
        investInERC20: [],
        investThresholdInERC20: [],
        investRatioInERC20: [],
        enableInvestment: true,
      },
    },
  ];
};

module.exports.prepareNetworkConfigs = function (networks) {
  const mainnetGwei = 21;
  const currentRelay = process.env.DEFAULT_RELAY || "infura";
  const hardhatLocalConfig = {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    localhost: {
      url: "http://localhost:8545",
    },
  };

  if (process.env.FORK_MAINNET && process.env.ALCHEMY_API_KEY) {
    hardhatLocalConfig.hardhat.forking = {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
    };
  }

  return networks.reduce((acc, network) => {
    acc[network] = {
      url: relayURLs(network)[currentRelay],
      accounts: {
        mnemonic: getMnenomic(),
      },
    };

    if (network === "mainnet") {
      acc[network].gasPrice = mainnetGwei * 1000000000;
    }

    return acc;
  }, hardhatLocalConfig);
};

function relayURLs(network) {
  return {
    infura: `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  };
}

function getMnenomic() {
  const filePath = process.env.MNEMONIC_PATH || "mnemonic.txt";

  try {
    return fs.readFileSync(filePath).toString().trim();
  } catch (err) {
    return "";
  }
}
