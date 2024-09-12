const Course = require('../models/Course')
const axios = require('axios');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { get } = require('mongoose');
const { getBitcoinPrice } = require('../../util/crypto');

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