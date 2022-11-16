// 'use strict';
// var async = require('async');

// const moment = require('moment');
// const output = require('../helper/api');
// var fs = require('fs');
// const path = require('path');
// var cron = require('node-cron');
// const { fork } = require('child_process');
// const deviceModel = require('../model/deviceId.model');
// const newNotification = require('../model/createNotification.model');
// const notification = require('../helper/notification');
// // const moment = require('moment');


// // ┌────────────── second (optional)
// // │ ┌──────────── minute
// // │ │ ┌────────── hour
// // │ │ │ ┌──────── day of month
// // │ │ │ │ ┌────── month
// // │ │ │ │ │ ┌──── day of week
// // │ │ │ │ │ │
// // │ │ │ │ │ │
// // * * * * * *

// class notificationController {
//     constructor() {

//         // ???? test 

//         // cron.schedule('5 * * * * *', () => {
//         //     const forked = fork('./src/controller/daiilyNotification.js');
//         //     forked.on('message', (msg) => {
//         //        console.log('Message from child', msg);
//         //        });
//         //        deviceModel.find({})
//         //        .exec((err,data)=>{
//         //            if(err){output.invalid(req, res, err);}
//         //            else{
//         //                let data2 = {title:"Good morning",msg:"Log your breakfast"}
//         //             forked.send({ message: data ,value:data2});
//         //            }
//         //        })

//         // });


//         // cron.schedule('0 1 * * * *', () => {
//         //     const forked = fork('./src/controller/child.js');
//         //     forked.on('message', (msg) => {
//         //         console.log('Message from child', msg);
//         //         });

//         //         forked.send({ hello: 'test' });
//         //       });



//         //   ---------

//         cron.schedule('59 59 7 1-31 1-12 0-7', () => {
//             // morning breakfast
//             const forked = fork('./src/controller/daiilyNotification.js');
//             forked.on('message', (msg) => {
//                 console.log('Message from child', msg);
//             });
//             deviceModel.find({})
//                 .exec((err, data) => {
//                     if (err) { output.invalid(req, res, err); }
//                     else {
//                         let data2 = { title: "Good morning", msg: "Log your breakfast" }
//                         forked.send({ message: data, value: data2 });
//                     }
//                 })
//         });

//         cron.schedule('59 59 14 1-31 1-12 0-7', () => {
//             //Drink up
//             const forked = fork('./src/controller/daiilyNotification.js');
//             forked.on('message', (msg) => {
//                 console.log('Message from child', msg);
//             });
//             deviceModel.find({})
//                 .exec((err, data) => {
//                     if (err) { output.invalid(req, res, err); }
//                     else {
//                         let data2 = { title: "Good Evening", msg: "Drink up" }
//                         forked.send({ message: data, value: data2 });
//                     }
//                 })
//         })

//         // -------
//         cron.schedule('59 59 8 1-31 1-12 0-7', () => {
//             // created notification

//             const forked = fork('./src/controller/daiilyNotification.js');
//             forked.on('message', (msg) => {
//                 console.log('Message from child', msg);
//             });
//             const start = new Date();
//             const end = new Date();
//             start.setHours(0, 0, 0, 0);
//             end.setHours(23, 59, 59, 999);
//             let dateTime = {
//                 $gte: start,
//                 $lte: end
//             }

//             newNotification.find({ trigger_time: dateTime })
//                 .exec((err, data) => {
//                     if (err) { output.invalid(req, res, err); }
//                     else {
//                         if (data.length) {
//                             for (let a = 0; a < data.length; a++) {
//                                 deviceModel.find({ $in: data[a].mobile_number })
//                                     .exec((err, value) => {
//                                         let data2 = { title: data[a].title, msg: data[a].message }
//                                         forked.send({ message: value, value: data2 });
//                                     })
//                             }
//                         } else {
//                             console.log('no recored today')
//                         }
//                     }
//                 })

//         });



//         cron.schedule('59 59 18 1-31 1-12 Friday', () => {
//             console.log('every day eve 3o clock')
//         })

//         cron.schedule('59 59 16 1-31 1-12 Saturday', () => {
//             console.log('every day eve 3o clock')
//         })



//     }

//     createNotification(req, res) {
//         // console.log(req.body)
//         if(req.body){
//             if(req.body.now == false){
//         let new_notification = new newNotification(req.body)
//         new_notification.save((err, result) => {
//             if (err) { output.invalid(req, res, err); }
//             else output.ok(req, res, result, "new message added", 0)
//         })
//     }else{
//         let new_notification = new newNotification(req.body)
//         new_notification.save((err, result) => {
//             if (err) { output.invalid(req, res, err); }
//             else output.ok(req, res, result, "new message added", 0)
//         })

//         // if(msg.message.length){
//         //     let data2 = { title: data[a].title, msg: data[a].message }

//         //     for(let x =0 ; x <= msg.message.length ; x++){
//         //         if(msg.message[x] && msg.message[x].deviceToken){
//         //             deviceToken.push(msg.message[x].deviceToken)
//         //         }
//         //     }

//         //     await notification(deviceToken,msg.value)
//         // }
//     }
//     }
//     }

// }

// module.exports = new notificationController();
