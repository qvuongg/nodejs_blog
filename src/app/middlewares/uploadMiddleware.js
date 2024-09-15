const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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

module.exports = upload;
