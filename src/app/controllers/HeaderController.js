// const axios = require('axios');


// class HeaderController {
//     priceCoin(req, res, next) {
//         console.log('Fetching Bitcoin price...');
//         getBitcoinPrice()
//             .then(btcPrice => {
//                 console.log('Fetched Bitcoin price:', btcPrice); 
//                 res.render('simpleView', { 
//                     btcPrice 
//                 });
//             })
//             .catch(error => {
//                 console.log('Error fetching Bitcoin price:', error);
//                 next(error);
//             });
//     }
// }


// // Helper function to fetch the Bitcoin price
// // function getBitcoinPrice() {
// //     return axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
// //         .then(response => response.data.bpi.USD.rate)
// //         .catch(error => {
// //             console.error('Error fetching BTC price:', error);
// //             return 'Unavailable';
// //         });
// // }

// module.exports = new HeaderController();
