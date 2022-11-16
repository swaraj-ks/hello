const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../config.json');

mongoose.connect(`${config.mongo_client}`);

const order_ = new Schema({
    order_id: {type: String, required: true, unique: true, default: new ObjectId()},
    user_id: {type: String, required: true},
    amount: {type:Number, required:true},
    order_attr: {type: Object, required: true},
    programmes:{type: Array, required: true},
    payment_details:{type: Object},
    create_date:{type: Date, default:Date.now}
}, {strict:false});


// Export the model
module.exports = mongoose.model('order', order_);
