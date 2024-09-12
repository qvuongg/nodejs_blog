const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
const multer = require('multer');
const path = require('path');


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
   store(req, res, next) {
    try { 
        console.log('Form data:', req.body);
        const course = new Course({
            name: req.body.name,
            description: req.body.description,
            videoId: req.body.videoId,
            image: 'uploa/img',
            level: req.body.level
        });

        // Lưu khóa học vào cơ sở dữ liệu
        course.save()
            .then(() => {
                res.json({ message: 'Course saved successfully' });
            })
            .catch(error => {
                console.error('Error saving course:', error); // In lỗi ra console
                res.status(500).json({ error: 'Error saving course', details: error });
            });
    } catch (error) {
        console.error('Error processing course:', error); // In lỗi ra console
        res.status(500).json({ error: 'Internal Server Error', details: error });
    }
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
        const updateData = req.file ? { ...req.body, image: `/uploads/${req.file.filename}` } : req.body;
        Course.updateOne({_id: req.params.id}, updateData)
            .then(() => res.redirect('/home'))
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
