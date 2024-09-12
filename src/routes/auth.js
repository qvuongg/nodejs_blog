const express = require("express");
const router = express.Router();
const { signUp, signIn, AuthController } = require("../app/controllers/AuthController");

// Route cho đăng ký người dùng
router.post("/signup", signUp);
router.post("/signin", signIn);

// Route cho hiển thị form đăng ký và đăng nhập
router.get("/register", AuthController.register);
router.get("/login", AuthController.login);

// Route cho logout
router.post('/logout', AuthController.logout);


module.exports = router;
