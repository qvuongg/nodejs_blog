const axios = require('axios');

async function getBitcoinPrice() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin',
                vs_currencies: 'usd'
            }
        });
        return response.data.bitcoin.usd;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        return 'N/A'; // Trả về giá trị mặc định nếu có lỗi
    }
}

module.exports = { getBitcoinPrice };
