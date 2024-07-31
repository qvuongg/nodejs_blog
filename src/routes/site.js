const express = require("express");
const router = express.Router();

const SiteController = require("../app/controllers/SiteController");

router.use("/search", SiteController.search);
router.use("/", SiteController.index);

module.exports = router;
