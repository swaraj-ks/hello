const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const state = new Schema({
    name:{type:String,required:true,unique:true}
    
});


// Export the model
module.exports = mongoose.model('state', state);
