const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
    // Get /courses
   show(req, res,next) {
        Course.findOne({ slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)})
            })
            .catch(next)

   }
   create(req , res, next){
        res.render('courses/create')
   }
   store(req , res, next){
        
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error =>{})
    }
    edit(req , res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course: mongooseToObject(course)

            }))
            .catch(next);       
    }
    //[PUT] /courses/:id
    update (req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
        //[delete] /courses/:id
    destroy (req, res, next){
        Course.delete({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    forceDestroy(req,res, next){
        Course.deleteOne({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
        //[patch] /courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }
        //[patch] /courses/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break;
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                .then(() => res.redirect('back'))
                .catch(next)
                break;
            default:
                res.json({message: 'Action invalid'})
        }
    }

// Get post put patch delete options head
}
module.exports = new CourseController();
