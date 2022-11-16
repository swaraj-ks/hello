const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const Qualifications = new Schema({
    name:{type:String,required:true,unique:true}
    
},{strict:false});


// Export the model
module.exports = mongoose.model('Qualifications', Qualifications);
