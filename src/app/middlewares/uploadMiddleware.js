// middleware/uploadMiddleware.js

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: "yddfduo44p",
    api_key: "349472563946791",
    api_secret: "x-d3PkfWy5VMLQWHE4MF6jgvP0c"
});

// Cấu hình lưu trữ với Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'courses',            // Thư mục trên Cloudinary để lưu trữ ảnh
        allowed_formats: ['jpg', 'png'],  // Các định dạng file cho phép
    },
});

// Tạo instance multer với cấu hình lưu trữ 
const upload = multer({ storage: storage });

// Export middleware upload
module.exports = upload;
