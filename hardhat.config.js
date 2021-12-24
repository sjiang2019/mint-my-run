require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: __dirname + "/.env" });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const {
  REACT_APP_ALCHEMY_ROPSTEN,
  REACT_APP_ALCHEMY_RINKEBY,
  REACT_APP_ALCHEMY_MAINNET,
  REACT_APP_ALCHEMY_OPTIMISM,
  REACT_APP_ALCHEMY_OPTIMISM_KOVAN,
} = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: REACT_APP_ALCHEMY_ROPSTEN,
      accounts: [],
    },
    rinkeby: {
      url: REACT_APP_ALCHEMY_RINKEBY,
      accounts: [],
    },
    optimismkovan: {
      url: REACT_APP_ALCHEMY_OPTIMISM_KOVAN,
      accounts: [],
    },
    mainnet: {
      url: REACT_APP_ALCHEMY_MAINNET,
      accounts: [],
    },
    optimism: {
      url: REACT_APP_ALCHEMY_OPTIMISM,
      accounts: [],
    },
  },
};
