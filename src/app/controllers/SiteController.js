const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // Get /search
    search(req, res, next) {
        const query = req.query.q;
        Course.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { slug: { $regex: query, $options: 'i' } }
            ]
        })
        .then(courses => {
            console.log(courses);  // Kiểm tra dữ liệu được tìm thấy
            res.render('courses/search', { 
                courses: mutipleMongooseToObject(courses),
                value: query
            });
        })
        .catch(next);
    }
    

    // Get /home
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
