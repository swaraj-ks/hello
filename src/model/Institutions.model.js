const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const Institutions_details = new Schema({
    Name:{type:String,required:true},
    Website:{type:String},
    Phone_Number:{type:Number,required:true},
    Email:{type:String,required:true},
    Pass:{type:String,required:true},
    City:{type:String},
    Street:{type:String},
    About:{type:String},
    State:{type:String},
    District:{type:String},
    Pin:{type:String},

    Faculties:{type:Array,default:[]},
    Facilities:{type:Array,default:[]},
    TieuPs:{type:Array,default:[]},
    Achievement:{type:Array,default:[]},
    Placement:{type:Array,default:[]},

    Location:{type:String},
    status:{type:Boolean,default:false},
    Address:{type:String},
    Logo:{type:String},
    email_verify:{type:Boolean,default:false},
    otp_verify:{type:Boolean,default:false},
    approve_status:{type:Number,default:0}
    
},{strict:false});


// Export the model
module.exports = mongoose.model('Institutions', Institutions_details);
