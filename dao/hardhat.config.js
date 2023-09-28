const fs = require("fs");

require("dotenv").config();

const { prepareNetworkConfigs } = require("./utils/configs");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@tenderly/hardhat-tenderly");

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
function configs() {
  const config = {
    networks: prepareNetworkConfigs([
      "mainnet",
      "rinkeby",
      "kovan",
      "ropsten",
      "goerli",
    ]),
    solidity: {
      version: "0.8.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
    namedAccounts: {
      deployer: 0,
    },
    gasReporter: {
      currency: "USD",
      gasPrice: 50,
      enabled: !!process.env.REPORT_GAS,
      coinmarketcap: process.env.COINMARKETCAP_API_KEY,
      maxMethodDiff: 10,
    },
  };
  if (process.env.ETHERSCAN_API_KEY) {
    config.etherscan = {
      apiKey: process.env.ETHERSCAN_API_KEY,
    };
  }
  return config;
}

module.exports = configs();
