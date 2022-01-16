const { SpotClient } = require('bybit-api');
const API_KEY = '';
const PRIVATE_KEY = '';
const useLivenet = true;

const client = new SpotClient(
  API_KEY,
  PRIVATE_KEY,

  // optional, uses testnet by default. Set to 'true' to use livenet.
  useLivenet,

  // restClientOptions,
  // requestLibraryOptions
);

client.getSymbols()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error(err);
  });

client.getBalances()
  .then(result => {
    console.log("getBalances result: ", result);
  })
  .catch(err => {
    console.error("getBalances error: ", err);
  });