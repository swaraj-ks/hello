const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);
// status => institution = default = false(need to approve from admin) ; teacher default = true
const login_details = new Schema({
   Email:{type:String,required:true},
   Pass:{type:String,required:true},
   type:{type:String,required:true},
   status:{type:Boolean,required:true},
   Phone_Number:{type:Number},
   email_verify:{type:Boolean,default:false},
   otp_verify:{type:Boolean,default:false},
   otp:{type:Number},
   
});


// Export the model
module.exports = mongoose.model('login', login_details);
