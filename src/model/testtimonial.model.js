const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const testmonial = new Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Mobile_Number:{type:Number,required:true},
    Message:{type:String},
    type:{type:String},
    create_date:{type:String,default:Date.now}
});


// Export the model
module.exports = mongoose.model('testmonials', testmonial);
