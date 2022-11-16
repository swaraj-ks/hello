const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const cart_ = new Schema({id:{type:String,required:true},},{strict:false});


// Export the model
module.exports = mongoose.model('cart', cart_);
