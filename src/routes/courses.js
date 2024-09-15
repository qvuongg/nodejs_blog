const express = require("express");
const router = express.Router();
const checkPermisson = require("../app/middlewares/CheckPermission");
const courseController = require("../app/controllers/CourseController");
const upload = require("../app/middlewares/uploadMiddleware");

const path = require('path');


<<<<<<< HEAD
router.get("/create",checkPermisson, courseController.create);
router.post("/store",checkPermisson, upload.single('image'),courseController.store);
router.get("/:id/edit",checkPermisson, courseController.edit);
router.post("/handle-form-actions",checkPermisson, courseController.handleFormActions)
router.put("/:id",checkPermisson,courseController.update);
=======
router.get("/create", checkPermisson, courseController.create);
router.post("/store", checkPermisson, upload.single('image'), courseController.store);
router.get("/:id/edit", checkPermisson, courseController.edit);
router.post("/handle-form-actions", checkPermisson, courseController.handleFormActions)
router.put("/:id", checkPermisson, courseController.update);
>>>>>>> 62d0482d75ff04b6f693316c240ff7bf76ab804d

router.delete("/:id", checkPermisson, courseController.destroy);
router.delete("/:id/force", checkPermisson, courseController.forceDestroy);
router.patch("/:id/restore", checkPermisson, courseController.restore);

router.get("/:slug", courseController.show);

module.exports = router;
