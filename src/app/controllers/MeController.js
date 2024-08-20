const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    // Get /
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) =>
                res.render('me/stored-courses',{
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(next);
    }
    // Get /trash
    trashCourses(req, res, next){
        Course.findDeleted({ deletedAt: { $ne: null } })  // Chỉ lấy các khóa học có trường deletedAt
            .then(courses => 
                res.render('me/trash-courses',{
                    courses: mutipleMongooseToObject(courses)
                })
            )
            .catch(next);
    }
    
}
module.exports = new MeController();
    