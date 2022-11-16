const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const news = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image_path:{type:String},
    blog_date:{type:Date} ,
    create_date:{type:Date,default:Date.now}
});


// Export the model
module.exports = mongoose.model('news', news);
