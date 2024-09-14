const multer = require('multer');

// Cấu hình bộ nhớ của multer, có thể cấu hình lưu file trong thư mục cụ thể

const upload = multer({ dest: 'uploads/' });

module.exports = upload;
