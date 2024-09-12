const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');

const mongooseDelete = require('mongoose-delete');

const CourseSchema = new Schema({
    name: { type: String, required: true,},
    description: { type: String},
    image: { type: String},
    videoId: { type: String, required: true,},
    level: { type: String},
    slug: { type: String, slug: 'name', unique:true}
},{
    timestamps: true,
});
// add plugins
mongoose.plugin(slug);
//custom query helpers
CourseSchema.query.sortable= function(req){
    
    if (req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc' , 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })  
    }
    return this;
}

CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all',
 });

module.exports = mongoose.model('Course', CourseSchema);