const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const AuthController = require('../controllers/AuthController');

dotenv.config();

const CheckPermission = async (req, res, next) => {
    const token = req.cookies.accessToken; // Lấy token từ cookie

    if (!token) {
        return res.status(401).json({
            status: 'error1',
            message: 'Bạn chưa đăng nhập!!'
        });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.SECRET_CODE);

        // Tìm kiếm người dùng theo ID đã giải mã
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                status: 'error2',
                message: 'Người dùng không tồn tại'
            });
        }

        // Kiểm tra vai trò người dùng
        if (user.role !== 'admin') {
            return res.status(403).json({
                status: 'error3',
                message: 'Chỉ admin mới có thể thực hiện hành động này'
            });
        }

        next(); // Người dùng có quyền, tiếp tục xử lý yêu cầu
    } catch (error) {
        return res.status(500).json({
            status: 'error4',
            message: 'Lỗi máy chủ: ' + error.message
        });
    }
};

module.exports = CheckPermission;
