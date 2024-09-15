const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify'); // Thay thế slug generator

const mongooseDelete = require('mongoose-delete');

const CourseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, unique: true }
}, {
    timestamps: true,
});

// Tạo slug trước khi lưu vào database
CourseSchema.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

// Add plugins
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        });
    }
    return this;
};

module.exports = mongoose.model('Course', CourseSchema);
