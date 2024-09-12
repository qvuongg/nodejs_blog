const axios = require('axios');
//API request
module.exports = async function cryptoPriceMiddleware(req, res, next) {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,ripple,litecoin,sui,binancecoin' // Các đồng coin top
            }
        });

        // Chuẩn bị dữ liệu để gửi đến view
        const cryptoData = response.data.map(coin => ({
            name: coin.name,
            price: coin.current_price,
            volatility: coin.price_change_percentage_24h
        }));

        res.locals.cryptoData = cryptoData;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        res.locals.cryptoData = []; // Trả về mảng rỗng nếu có lỗi
    }
    next();
}
