const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

// type => online / offline;
// Category - (freshers, experienced, principal)
// programme_amount => free : 0 || paid : 1 < 

const programme = new Schema({
    title:{type:String,required:true},
    training_start_date:{type:Date,required:true},
    training_end_date:{type:Date,required:true},

    type:{type:String},
    state:{type:String},
    city:{type:String},
    Description:{type:String},
    Duration:{type:String},

    // programme_cost:{type:Number},
    minimum_participate_discount:{type:String},
    premium_member_discount:{type:String},
    payment_status:{type:Boolean,default:false},
    programme_amount:{type:String},
    lat:{type:String},
    longitude:{type:String},
    link:{type:String},
    status:{type:Boolean,default:true},
    centers:{type:Array},
    dueDate:{type:Date},
    location:{type:String},category:{type:String},
    created_date:{type:Date,default:Date.now}
     
},{strict:false});


// Export the model
module.exports = mongoose.model('training_programme', programme);
