const bcryptjs = require('bcryptjs');
const User = require('../models/User');

const userValidator = require('../validation/user');


 const signUp = async (req, res) => {
    try {
        // Validate dữ liệu ngừoi dùng
        const { error } = userValidator.validate(req.body, { abortEarly: false });
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
        res.status(201).json({ 
            message: 'Đăng ký thành công',
            user    
        });
    } catch (error) {
        res.status(400).json({ 
            name: error.name,
            message: error.message
            
        });
    }
}
module.exports = {signUp,};