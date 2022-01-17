const fs = require('fs');
const { placeSellOrder } = require('./src/sellFunctions');

(async () => {
    const rawData = fs.readFileSync('./inputData/orders.json');
    const { orders, apiKey, privateKey } = JSON.parse(rawData);
    let orderInfo = []
    for (const order of orders){
        if (order.type === 'SELL_LIMIT'){
            try {
                const info = await placeSellOrder(order.symbol, order.qty, apiKey, privateKey, order.price);
                orderInfo.push({ data: info.data, status: info.status})
            }
            catch(e) {
                console.error(e);
            }
        }
    }
    fs.writeFileSync('./outputData/placedOrders.json', JSON.stringify({ orders: orderInfo }))
    console.log(orderInfo);
})()