'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const msg912 = require('sendotp');
const msg91 = new msg912('338590AxCFHU9rFf5f326bf6P1','Your Registration got approved');

function message2(message,mobile,callback){
  console.log("msg")
    // var msg91 = require('msg91-sms');
    // let authkey = '338590AxCFHU9rFf5f326bf6P1';
    let senderid = 'Campus';
    let dialcode = '';
    var route = 'Transactional';
    let current_time = new Date();
    let exp_time = moment(current_time).add(30, 'minutes')
    const otp = Math.floor(1000 + Math.random() * 9000)
    // let message = "Hello, Your Verification Code is " + otp;
    var num = '91' +mobile;
    let number = num.toString();
  console.log(number)
    msg91.send(number, senderid,123, function (err,response) {
      console.log(err,response,'mob')
      callback(err,response)
    });
}
module.exports = message2;
