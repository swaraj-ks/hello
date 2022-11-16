'use strict';
// const deviceModel =  require('../model/deviceId.model');
var async = require('async');
// const deviceModel = require('../models/deviceId.model');
// const select = require('../queries/select');
// const insert = require('../queries/insert');
// const update = require('../queries/update');
// const dele = require('../queries/delete');
// const output = require('../helper/api');
const notification = require('../helper/notification');



process.on('message', async (msg) => {
    // console.log('Message from parent:', msg);
    let deviceToken = [];
    if(msg.message.length){
        for(let x =0 ; x <= msg.message.length ; x++){
            // console.log(msg.message[x])s
            if(msg.message[x] && msg.message[x].deviceToken){
                deviceToken.push(msg.message[x].deviceToken)
            }
        }
        // notification(deviceToken,msg.value,(data)=>{
        //     process.send({ data:data })
        // })
        await notification(deviceToken,msg.value)
        process.send({ data:'snt' })
    }
  process.exit(0)
  });
 
