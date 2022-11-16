const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const Jobs_details = new Schema({
    title:{type:String,required:true},
    required_exp:{type:Number,required:true},
    Qualification:{type:String,required:true},
    Number_of_vacancy:{type:Number,required:true},
    Last_Date:{type:Date,required:true},
    Description:{type:String,required:true},
    status:{type:Boolean,default:true},
    institution_id:{type:String,required:true},
    institution_name:{type:String,required:true},
    create_date:{type:Date,default:Date.now}
},{strict:false});


// Export the model
module.exports = mongoose.model('Jobs_details', Jobs_details);
