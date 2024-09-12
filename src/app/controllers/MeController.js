const Course = require('../models/Course')
const axios = require('axios');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { get } = require('mongoose');
const { getBitcoinPrice } = require('../../util/crypto');
// // Hàm lấy giá Bitcoin từ API
// async function coinPrice() {
//     try {
//         const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
//             params: {
//                 ids: 'bitcoin',
//                 vs_currencies: 'usd'
//             }
//         });
//         const btcPrice = response.data.bitcoin.usd;
//         return btcPrice;
//     } catch (error) {
//         console.error('Error fetching Bitcoin price:', error); // Log ra lỗi nếu có
//         return 'N/A'; // Trả về giá trị mặc định nếu có lỗi
//     }
// }
class MeController {

    // Xử lý GET request cho /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted({ deletedAt: { $ne: null } }),
            // getBitcoinPrice()
        ])
        .then(([courses, deletedCount, btcPrice]) => {
            res.render('me/stored-courses', {
                deletedCount,
                courses: mutipleMongooseToObject(courses),
                // btcPrice 
            });
        })
        .catch(next); 
    }
    // Xử lý GET request cho /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({ deletedAt: { $ne: null } })
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next); 
    }
}
    module.exports = new MeController();