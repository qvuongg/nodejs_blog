

module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        // Nếu người dùng đã đăng nhập, lưu thông tin người dùng vào res.locals
        res.locals.user = req.session.user;
    } else {
        // Nếu không có người dùng, đặt user thành null
        res.locals.user = null;
    }
    next(); // Tiếp tục xử lý các middleware hoặc route tiếp theo
};
