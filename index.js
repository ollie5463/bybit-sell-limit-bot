const fs = require('fs');
const { createHmac } =  require('crypto');
const axios = require('axios');
const API_KEY = '';
const PRIVATE_KEY = '';

const serializeParams = (params, strict_validation = false) => {
    return Object.keys(params)
      .sort()
      .map(key => {
        const value = params[key];
        if (strict_validation === true && typeof value === 'undefined') {
          throw new Error('Failed to sign API request due to undefined parameter');
        }
        return `${key}=${value}`;
      })
      .join('&');
  };
const signMessage = (message, secret) => {
    console.log('message: ', message)
    return createHmac('sha256', secret)
    .update(message)
      .digest('hex');
  };
  

const signRequest = async () => {
    const params = {
        symbol: 'BITUSDT',
        timeInForce: 'GTC',
        price: 10,
        type: 'LIMIT',
        side: 'Sell',
        qty: 10,
        api_key: API_KEY,
        recv_window: 15000000,
        timestamp: Date.now()
    };

    // // Optional, set to 5000 by default. Increase if timestamp/recv_window errors are seen.
    // if (this.options.recv_window && !params.recv_window) {
    //   params.recv_window = this.options.recv_window;
    // }

    // if (this.key && this.secret) {
    const serializedParams = serializeParams(params, false);
    const sign = await signMessage(serializedParams, PRIVATE_KEY);

    console.log('serializeParams: ', serializedParams)
    console.log('sign: ', sign)
    // }

    return serializedParams + `&sign=${sign}`;
}

(async () => {
    const serializedParams = await signRequest();
    console.log(serializedParams);
    // Send a POST request
    const res = await axios.post(`https://api.bybit.com/spot/v1/order?${serializedParams}`);
    console.log('res: ', res)
})()