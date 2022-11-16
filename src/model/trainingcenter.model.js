const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const center = new Schema({
    name:{type:String,required:true},
    city:{type:String},
    District:{type:String},
    State:{type:String},
    Pin:{type:Number},
    lat:{type:String},
    longitude:{type:String},
    website:{type:String},
    status:{type:Boolean,default:true},
    Phone_Number:{type:Number},
    About:{type:String},
    Email:{type:String},
    location:{type:String},
    created_date:{type:Date,default:Date.now}
    
});


// Export the model
module.exports = mongoose.model('center', center);
