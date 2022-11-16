const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const Enquiries_ = new Schema({
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    Mobile_Number:{type:Number,required:true},
    Message:{type:String}
});


// Export the model
module.exports = mongoose.model('Enquiries', Enquiries_);
