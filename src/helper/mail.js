'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

function sendMail(req, res,email,details,subject,callback) {
    console.log(email,details,subject,'email,details,subject,')
    let page = (subject == "Application Status") ?'index' : 'approvestatus';
   res.render(page, {details:details}, function(err, html){ 

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Zoho',
        host: 'smtp.zoho.eu',
        port: 587,//587
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'no-reply@campusfield.in',
          pass: 'cfVerify@2020'
        }
      });
  
    // setup email data with unicode symbols
      if(err){
        console.log(err);
      }else{
    let mailOptions ={
        from: '"CampusField " <no-reply@campusfield.in>', // sender address
        to: email, // list of receivers
        subject:subject , // Subject line
        // text: "user_detail", // plain text body
        generateTextFromHtml : true,
        html: html
        

    };

    // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error,'error')
         callback(error,[])
        } else {
            callback(null,info)
        }
      }); 
}
});
   // payment_update(id,ordered_id,user_id);
}

module.exports = sendMail;
