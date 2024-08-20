const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
    // Get /home/search
    search(req, res) {
        res.render("search");
    }
    // Get /home
    index(req, res, next) {

        Course.find({})
        .then(courses =>{
            res.render('home', {
                courses: mutipleMongooseToObject(courses)
            });
        })
        .catch(next);

    }
}
module.exports = new SiteController();
