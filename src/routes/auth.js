const express = require("express");
const router = express.Router();
const signUp = require("../app/controllers/AuthController");

const authController = require("../app/controllers/AuthController");

router.post("/signup", authController.signUp);

module.exports = router;