'use strict'
const mongoose = require('mongoose');
// mongoose.connect(`mongodb://chewyuser:user2018@172.31.13.168:10050/chewy`);
mongoose.connect('mongodb://localhost:27017/campus', {useNewUrlParser: true});
// mongoose.connect(`mongodb://chewyuser:user2018@15.206.175.142:10050/chewy`,{useNewUrlParser: true});

// mongoose.connect(`${config.mongo_client}/chewy`);
mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );

module.exports = mongoose;