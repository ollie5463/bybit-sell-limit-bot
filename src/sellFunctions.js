const axios = require('axios');
const { serializeParams, signMessage } = require('./helpers');

const getSellOrderParams = async (symbol, qty, apiKey, privateKey, price) => {
    const params = {
        symbol,
        timeInForce: 'GTC',
        price,
        type: 'LIMIT',
        side: 'Sell',
        qty,
        api_key: apiKey,
        recv_window: 15000000,
        timestamp: Date.now()
    };

    const serializedParams = serializeParams(params, false);
    const sign = await signMessage(serializedParams, privateKey);

    console.log('serializeParams: ', serializedParams)
    console.log('sign: ', sign)

    return serializedParams + `&sign=${sign}`;
};

const placeSellOrder = async (symbol, qty, apiKey, privateKey, price) => {
    const serializedParams = await getSellOrderParams(symbol, qty, apiKey, privateKey, price)
    return await axios.post(`https://api.bybit.com/spot/v1/order?${serializedParams}`);
};

module.exports = { getSellOrderParams, placeSellOrder }