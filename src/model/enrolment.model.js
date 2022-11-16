const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');
const Institution = require('../controller/Institution');

mongoose.connect(`${config.mongo_client}`);

const enrolment2 = new Schema({
    members:{type:Array},
    enrolment_programme:{type:Array,required:true},
    Institution_enrolment:{type:String}
},{strict:false});


// Export the model
module.exports = mongoose.model('endrolment', enrolment2);
