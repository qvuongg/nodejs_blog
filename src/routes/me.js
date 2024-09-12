const express = require("express");
const router = express.Router();
const checkPermisson = require("../app/middlewares/CheckPermission");

const meController = require("../app/controllers/MeController");

router.get("/stored/courses",checkPermisson, meController.storedCourses);
router.get("/trash/courses",checkPermisson, meController.trashCourses);




module.exports = router;
