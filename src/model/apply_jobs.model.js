const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);
// 1 => applied from user // 2 => approve from admin // 3 => close // 
const apply_jobs = new Schema({
    job_id:{type:String,required:true},
    user_id:{type:String,required:true},
    resume_path:{type:String,required:true},
    institution_id:{type:String,required:true},
    job_title:{type:String,required:true},
    applicant_name:{type:String,required:true},
    institution_name:{type:String},
    date:{type:Date,default:Date.now},
    status:{type:Number,default:1},
    schedule_date:{type:Date}
},{strict:false});


// Export the model
module.exports = mongoose.model('apply_jobs', apply_jobs);
