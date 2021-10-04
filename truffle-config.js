require('dotenv').config();
require('@babel/polyfill');
const LedgerWalletProvider = require('truffle-ledger-provider');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      host: "127.0.0.1",
      port: 8545
    },
    bsc: {
      provider: () => new LedgerWalletProvider(
        {
          networkId: 56,
          accountsOffset: 0
        },
        'https://bsc-dataseed.binance.org/'
      ),
      gas: 2000000,
      gasPrice: 5 * 10 ** 9,
      network_id: 56,
      skipDryRun: true
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(
        ['0x9e07b6814bedea4b970275ef1e8b73388121e0ff09f8ab05c815802a50948be1'],
        'https://data-seed-prebsc-1-s1.binance.org:8545'
      ),
      network_id: 97,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.7.6"
    }
  },
  plugins: [
     'truffle-plugin-verify'
   ],
  api_keys: {
   bscscan: process.env.BSCSCAN_API_KEY
  },
};
