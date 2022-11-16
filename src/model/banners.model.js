const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const banner = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image_path:{type:String,required:true},    
});


// Export the model
module.exports = mongoose.model('banner', banner);
