'use strict';

var async = require('async');
const axios = require('axios')
const output = require('../helper/api');
const mongoose = require('mongoose');
const moment = require('moment');

const suggestModel = require('../model/suggest_model');
const loginModel = require('../model/login.model');
const InstitutionsModel = require('../model/Institutions.model');
const TeacherModel = require('../model/Teachers.model');



const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }).single('profile');
const config = require('../../config.json');
// const upload_profile2 = multer({ storage: storage }).single('profile');

// load aws sdk
var AWS = require('aws-sdk');

// // load aws config
// aws.config.loadFromPath('config.json');

// // load AWS SES
// var ses = new aws.SES({apiVersion: '2010-12-01'});

// // send to list
// var to = ['email@example.com']

// // this must relate to a verified SES account
// var from = 'emailc@example.com'


class VerificationController {
  constructor(con) {
    this.config = con;
  }

  nodemailler(req, res) {
    console.log("enter")
    var nodemailer = require('nodemailer');
    // let transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   host: 'smtp.gmail.com',
    //   port: 587,//587
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: 'campusfieldtech@gmail.com',
    //     pass: 'business2020'
    //   }
    // });



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


    // if(Object.keys(req.body).length){



    // res.render('mail', {user_detail:user_detail,total_amount:total_amount,address:address,city
    //  :city,zip:zip,mobile:mobile,type:type,order:demo,delivery_charge:d_charge,cop_name:cop_name,cop_value:cop_value,cop_value2:cop_value2}, function(err, html){ 

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    console.log(req.params.email, 'req.params.email')

    loginModel.find({ $and: [{ Email: { $regex: req.params.email, $options: "i" } }, { email_verify: false }] })
      .exec((err, data) => {
        if (err) {
          console.log(err, 'err')
          output.serverError(req, res, err);
        } else {
          if (data.length == 1) {

            console.log(data, 'email otp')

            let link = "https://campusfield.in/#/verify?otp=" + data[0]['otp'] + "&email=" + req.params.email;
            let mailOptions = {
              from: '"CampusField " <no-reply@campusfield.in>', // sender address
              to: req.params.email, // list of receivers
              subject: 'Verification Mail ✔', // Subject line
              text: "Please click the below URL to verify your account", // plain text body
              //  generateTextFromHtml : true,
              html: "<b>Greetings from Campus Field!!</b><br><b>You have successfully registered and have completed the verification process.</b><br><b>To access the facilities provided by Campus Field, please click on the below link and login to your Campus Filed account  </b><br><br><a href='" + link + "' target='_blank' style='color:blue'>Click here</a> <br><br> <b>Thanks</b>"
            };

            //   // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                output.serverError(req, res, error);

              } else {
                output.ok(req, res, info.response, "mail send", 1)

              }
            });
          } else {
            console.log(data)
            output.ok(req, res, [], "Your account Not found,Please contact team", 0)

          }
        }
      })
  }

  selectCandidate(req, res) {
    try {
      if (req.body.value && req.body.value.length) {
        suggestModel.update({ _id: { $in: req.body.value } }, { $set: { 'select_status': true } })
          .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "saved", 1)
          })
      } else {
        output.ok(req, res, [], "Value are missing", 1)
      }
    } catch (ex) { output.serverError(req, res, ex) }
  }
  // upload(req,res){
  // }
  // AIzaSyB3SZFEjSpyejs5JmtOWu7bICrFNoZziv8
  upload_media(req, res) {

    return new Promise(function (resolve, reject) {
      upload(req, res, function (err, data) {
        const file = req.file;
        if (file) {
          let s3FileURL = process.env.S3_URL;
          let s3bucket = new AWS.S3({
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: process.env.AWS_REGION
          });
          var params = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key: file.originalname,
              Body: file.buffer,
              ContentType: file.mimetype,
              ACL: process.env.S3_ACL
          };
          s3bucket.upload(params, function (err, data) {
            if (err) {
              res.status(500).json({ error: true, Message: err });
            } else {
              var newFileUploaded = {
                description: req.body.description,
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key
              };
              console.log(newFileUploaded, 'newFileUploaded')
              res.send({ data });

            }
          })
        } else {
          res.status(500).json({ error: true, Message: "err" });

        }
        // if (err !== null) return reject(output.invalid(req, res, err));
        // resolve(output.ok(req, res, data, "uploaded", 0))
      });
    });
  }

  sendsms(req, res) {
    let otp = Math.floor(1000 + Math.random() * 9000)
    let messageString = `Hi, Your verification code is ${otp}. Please do not share with anyone.`
    let mobileNumber = '+91' + req.params.mobile_no;
    let formData = new URLSearchParams()

    formData.append('templateId', '1207162376995270012')
    formData.append('type', 'OTP')
    formData.append('sender', 'CFIELD')
    formData.append('body', messageString)
    formData.append('to', mobileNumber)
    
    let config = {
      'headers': { 
        'api-key': 'Ab7c746a1b228f13397b9c0ad2be94768'
      }
    }

    axios.post('https://api.kaleyra.io/v1/HXIN1701520625IN/messages', formData, config)
    .then(response => {
      if (response.status == 202) {
        loginModel.findOneAndUpdate({ Email: { $regex: req.params.email, $options: "i" } }, { $set: { 'otp_verify': false, 'Phone_Number': req.params.mobile_no, 'otp': otp } })
          .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "saved", 1)
          })
        // output.ok(req, res, {'message': "Otp sent"}, "saved", 1)
      } else {
        output.serverError(req, res, {message: "Failed to generate OTP"})
      }
    })
    .catch(error => {
      console.log(error)
      output.serverError(req, res, error);
    })
  }

  send_mobile(req, res) {
    loginModel.find({ Email: req.params.mail }, { Phone_Number: 1 })
      .exec((err, data) => {
        if (err) output.serverError(req, res, err);
        else output.ok(req, res, data, "saved", 1)
      })
  }

  reset_password(req, res) {

    loginModel.findOneAndUpdate({ Email: req.body.user_id }, { $set: { Pass: req.body.password } })
      .exec((err, data) => {
        if (err) output.serverError(req, res, err);
        else output.ok(req, res, data, "saved", 1)
      })
  }


  verify_otp(req, res) {
    let setoption = {}
    // option email/sms
    console.log(req.params.email, "req.params.email",req.params.option)
    // setoption['status'] = true;
    if(req.params.option == "email") { setoption['email_verify'] = true }else {setoption['otp_verify'] = true;}
    // (req.params.option == 'email') ? setoption['email_verify'] = true : setoption['otp_verify'] = true;
    // loginId
    loginModel.findOneAndUpdate({ $and: [{ Email: req.params.email }, { otp: req.params.otp }] }, { $set: setoption })
      .exec((err, data) => {
        if (err) { output.serverError(req, res, err); }
        else if (data) {
          console.log(data)
          if(data.otp == req.params.otp){
          // InstitutionsModel.findOneAndUpdate()
         

          InstitutionsModel.findOneAndUpdate({ $and: [{ Email: req.params.email }] }, { $set: setoption })
            .exec((err,data2)=>{
              TeacherModel.findOneAndUpdate({ $and: [{ Email: req.params.email }] }, { $set: {status:true} })
              .exec((err,data2)=>{
                output.ok(req, res, data, "update", 1)

              })

            })
          }
        }
        else {
          output.ok(req, res, [], "Invalid OTP", 0)
        }
      })
  }

  sendMail(req, res) {
    // AKIAR4GYIJ4VN4JSLUPB
    // axE02Q6nW/M6y2rhQCskT5xkYXyduuwErUInunO3
    'use strict';

    var aws = require('aws-sdk');

    // Provide the full path to your config.json file. 
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    AWS.config.region = process.env.AWS_REGION;
    // aws.config.loadFromPath({
    //     "AWS_ACCESS_KEY_ID":"AKIAR4GYIJ4VF2AXXYI4",
    //     "AWS_SECRET_ACCESS_KEY":"GzOwpnwjRzsFbT7SbCnY7QnYR1YbLtT2v14cFAej"
    //   }
    //   );

    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    const sender = "no-reply@campusfield.in";

    // Replace recipient@example.com with a "To" address. If your account 
    // is still in the sandbox, this address must be verified.
    const recipient = "callmeshankar007@gmail.com";

    // Specify a configuration set. If you do not want to use a configuration
    // set, comment the following variable, and the 
    // ConfigurationSetName : configuration_set argument below.
    const configuration_set = "campus";

    // The subject line for the email.
    const subject = "Amazon SES Test (AWS SDK for JavaScript in Node.js)";

    // The email body for recipients with non-HTML email clients.
    const body_text = "Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
      + "This email was sent with Amazon SES using the "
      + "AWS SDK for JavaScript in Node.js.";

    // The HTML body of the email.
    const body_html = `<html>
        <head></head>
        <body>
          <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
          <p>This email was sent with
            <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
            <a href='https://aws.amazon.com/sdk-for-node-js/'>
              AWS SDK for JavaScript in Node.js</a>.</p>
        </body>
        </html>`;

    // The character encoding for the email.
    const charset = "UTF-8";

    // Create a new SES object. 
    var ses = new aws.SES();

    // Specify the parameters to pass to the API.
    var params = {
      Source: sender,
      Destination: {
        ToAddresses: [
          recipient
        ],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: charset
        },
        Body: {
          Text: {
            Data: body_text,
            Charset: charset
          },
          Html: {
            Data: body_html,
            Charset: charset
          }
        }
      },
      ConfigurationSetName: configuration_set
    };

    //Try to send the email.
    ses.sendEmail(params, function (err, data) {
      // If something goes wrong, print an error message.
      if (err) {
        console.log(err.message, 'errrr');
      } else {
        console.log("Email sent! Message ID: ", data.MessageId);
      }
    });

  }

}

module.exports = new VerificationController();
