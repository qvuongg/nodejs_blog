const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const signUpValidator = require('../validation/user').signUpValidator;
const signInValidator = require('../validation/user').signInValidator;
dotenv.config();

const SECRET_CODE = process.env.SECRET_CODE;

 const signUp = async (req, res) => {
    try {
        // Validate dữ liệu ngừoi dùng
        const { error } = signUpValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(error => error.message);
            return res.status(400).json({ 
                message: errors });
        }
        // Kiểm tra email đã tồn tại chưa
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({ message: 'Email này đã được đăng ký, bạn có muốn đăng nhập không?' });
        }
        // Mã hóa mật khẩu
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        // Khởi tạo user trong db
        const user = await User.create({ 
            ...req.body,
            password: hashedPassword
        });
        // Thông báo cho người dùng
        // Xoá mật khẩu đi
        user.password = undefined;
        res.render(
            'auth/login',
            {
                alert: 'Đăng ký thành công, bạn có thể đăng nhập ngay bây giờ'
            }
        );
    } catch (error) {
        res.status(400).json({ 
            name: error.name,
            message: error.message
            
        });
    }
}

const signIn = async (req, res) => {
    try {
        // Validate data tu phia client
        const { error } = signInValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(error => error.message);
            return res.status(400).json({ 
                message: errors });
        }
        // Kiểm tra email đã tồn tại chưa
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ message: 'Email này chưa được đăng ký, bạn có muốn đăng ký không?' });
        }
        //kiem tra password
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không chính xác' });
        }
        //tao JWT token
        const accessToken = jwt.sign({ id: user._id }, SECRET_CODE , { expiresIn: '1h' });
        //Tra ra thong bao cho user
        user.password = undefined;

        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 3600000 }); // 1 hour
       // Lưu thông tin người dùng vào session
        req.session.user = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role // Nếu bạn có thuộc tính vai trò
        };
        // Đặt thông báo flash và chuyển hướng
        req.flash('success', 'Đăng nhập thành công');
        res.redirect('/home');

        
        

    } catch (error) {
        res.status(400).json({ 
            name: error.name,
            message: error.message
            
        });
    }}

class AuthController{
    register(req, res) {
        res.render('auth/register');
    }

    login(req, res) {
        res.render('auth/login');
    }

    logout(req, res) {
        // Xóa thông tin người dùng khỏi session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Có lỗi xảy ra khi đăng xuất' });
            }
            res.clearCookie('accessToken'); // Xoá cookie chứa access token hoặc thông tin phiên
            return res.status(200).json({ message: 'Đăng xuất thành công!' }); // Trả về phản hồi JSON
        });
    }

}
module.exports = {
    signUp,
    signIn,
    AuthController: new AuthController()
};
