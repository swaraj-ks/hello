const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');
//status =>  true:active || false:inactive
mongoose.connect(`${config.mongo_client}`);

const Teachers_details = new Schema({
    First_name:{type:String,required:true},
    Last_name:{type:String,required:true},
    Pass:{type:String,required:true},
    DOB:{type:String},
    Phone_Number:{type:Number,required:true},
    Email:{type:String,required:true},
    Gender:{type:String},
    About:{type:String},
    State:{type:String},
    Street:{type:String},
    District:{type:String},
    Pin:{type:Number},
    Profile_pic:{type:String,default:""},
    Resume:{type:String,default:""},
    Qualification:{type:Array,default:[]},
    Certification:{type:Array,default:[]},
    Total_Experience:{type:String},
    Training_from_campus:{type:Array,default:[]},
    Experience:{type:Array,default:[]},
    Transactions:{type:Array,default:[]},
    status:{type:Boolean,default:false},
    applied_jobs:{type:Array,default:[]},
    isSkip:{type:Boolean,default:false},
    isFresher:{type:Boolean,default:true},
    isSubscribed:{type:Boolean,default:false}
    
},{strict:false});


// Export the model
module.exports = mongoose.model('Teachers', Teachers_details);
