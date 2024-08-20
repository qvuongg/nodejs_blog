const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/NewsController");

router.get("/detail", newsController.show2);
router.get("/slug", newsController.show);
router.get("/", newsController.index);

module.exports = router;
