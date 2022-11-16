const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const training = new Schema({
    name:{type:String,required:true},
    duration:{type:Number,required:true},
    fee:{type:String,required:true},
    description:{type:Number,required:true},
    date:{type:Date,default:Date.now},

});


// Export the model
module.exports = mongoose.model('training', training);
