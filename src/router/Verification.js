'use strict';

const express = require('express');
const verify = require('../controller/Verification');
const Route = express.Router();

Route
  .get('/email/:email',verify.nodemailler)
  .get('/mobile/:mobile_no/:email',verify.sendsms)
  .get('/otpVerification/:email/:otp/:option',verify.verify_otp)
  .post('/test_update',verify.upload_media)
  .post('/reset',verify.reset_password)
  .get('/:mail',verify.send_mobile)




module.exports = Route;
