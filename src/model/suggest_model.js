const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);
// 1 => applied from user // 2 => approve from admin // 3 => close // 
const suggest_models = new Schema({
    job_id:{type:String,required:true},
    user_id:{type:String,required:true},
    resume_path:{type:String},
    institution_id:{type:String,required:true},
    job_title:{type:String,required:true},
    applicant_name:{type:String,required:true},
    email:{type:String,required:true},
    institution_name:{type:String},
    date:{type:Date,default:Date.now},
    details:{type:Array},
    select_status:{type:Boolean,default:false},
    schedule_date:{type:Date},
    isViewed:{type:Boolean,default:false}
},{strict:false});


// Export the model
module.exports = mongoose.model('suggest_model', suggest_models);
