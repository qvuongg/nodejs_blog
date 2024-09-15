const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

class CourseController {
    // GET /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => res.render('courses/show', { course: mongooseToObject(course) }))
            .catch(next);
    }

<<<<<<< HEAD
   }
   create(req , res, next){
        res.render('courses/create')
   }
   store(req, res, next) {
    // Kiểm tra req.file và req.body
    console.log('File:', JSON.stringify(req.file, null, 2));  // In ra thông tin file đã được upload
    console.log('Body:', JSON.stringify(req.body, null, 2));  // In ra nội dung của form

    // Lấy URL của hình ảnh đã upload trên Cloudinary
    const imageUrl = req.file ? req.file.path : '';

    // Tạo một đối tượng course mới với thông tin từ form
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        videoId: req.body.videoId,
        image: imageUrl,
        level: req.body.level
    });

    // Lưu khóa học vào database
    course.save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(error => {
            console.error('Error saving course:', error);
            res.status(500).send('Error saving course');
        });
}

    edit(req , res, next){
=======
    // GET /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // POST /courses/store
    store = async (req, res, next) => {
        try {
            console.log(req.body);

            const result = await cloudinary.uploader.upload(req.file.path);
            const img = result.secure_url;

            const course = new Course({
                name: req.body.name,
                description: req.body.description,
                image: img,
                videoId: req.body.videoId,
                level: req.body.level,
            });

            await course.save();

            fs.unlinkSync(req.file.path);

            res.redirect('/me/stored/courses');
        } catch (error) {
            console.error(error);
            res.status(500).send('Có lỗi xảy ra');
        }
    }

    // GET /courses/edit/:id
    edit(req, res, next) {
>>>>>>> 62d0482d75ff04b6f693316c240ff7bf76ab804d
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // PUT /courses/:id
    update(req, res, next) {
        const updateData = req.file ? { ...req.body, image: `/uploads/${req.file.filename}` } : req.body;
        Course.updateOne({ _id: req.params.id }, updateData)
            .then(() => res.redirect('/home'))
            .catch(next);
    }

    // DELETE /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // FORCE DELETE /courses/:id
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // PATCH /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new CourseController();
