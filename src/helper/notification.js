var express = require('express');
var router = express.Router();
var FCM = require('fcm-node');
var serverKey = 'AAAA6XPj68A:APA91bHE2CeMcwJbT8lckqoWoKuDbpIDp8tKvnHTg02_5LUgsZZAK_rqLt5oxDRUmq54Qz5HRp3Yg-uc2ij4K4Ie5cqax45-01tLtBxX8GHuyy4g1_kkWgROX1ygVMUoDljcCwbAikDm';



async function  sendNotification(validDeviceRegistrationToken, data_main) {
    // console.log(typeof validDeviceRegistrationToken[0], data,'validDeviceRegistrationToken, data,')
    const fcm = new FCM(serverKey)
    // var message = { 
    //     to: 'eOi4Gz1Hpeo:APA91bGc9cNEDmeEtkOJbEvW_Lw4h0jIq1MyN074p-CCIuD9RZg4gXBrLK-eabTVY_lthqlkOJX8Uc-OQH4t1cXlPYg63q-q1UDYgfUII2gU4zLtaN4r7X8gZ30Fe0kesW_46TT81A73', 
    //     //collapse_key: 'your_collapse_key',

    //     notification: {
    //         title: 'No title', 
    //         body: 'No Message'
    //     },

    //     data: {  //you can send only notification or only data(or include both)
    //         my_key: 'my value',
    //         my_another_key: 'my another value'
    //     }
    // }

    // fcm.send(message, function(err, response){
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Successfully sent with response: ", response)
    //         // res.send("message sent");
    //         // process.exit()
    //     }
    // })



    var payloadOK = {
        // to: 'eOi4Gz1Hpeo:APA91bGc9cNEDmeEtkOJbEvW_Lw4h0jIq1MyN074p-CCIuD9RZg4gXBrLK-eabTVY_lthqlkOJX8Uc-OQH4t1cXlPYg63q-q1UDYgfUII2gU4zLtaN4r7X8gZ30Fe0kesW_46TT81A73', 

        registration_ids: validDeviceRegistrationToken,
        data: { //some data object (optional)
            url: 'message',
            test: 'test',
            test: 'sdbsk'
        },
        priority: 'high',
        content_available: true,
        notification: { //notification object
            title: (Object.keys(data_main).length)?data_main.title:'No title', body: (Object.keys(data_main).length)?data_main.msg:'No title', sound: "default", badge: "1"
        }
    };

     let send = fcm.send(payloadOK, async function (err, res) {
        let resposnse = callbackLog('sendOK', err, res);
        // callback(resposnse)
    });

    var callbackLog = function (sender, err, res) {
    
        console.log("\n__________________________________")
        console.log("\t" + sender);
        console.log("----------------------------------")
        console.log("err=" + err);
        console.log("res=" + res);
        console.log("----------------------------------\n>>>");
    };
    send()
    // next()
};
// sendNotification(['eOi4Gz1Hpeo:APA91bGc9cNEDmeEtkOJbEvW_Lw4h0jIq1MyN074p-CCIuD9RZg4gXBrLK-eabTVY_lthqlkOJX8Uc-OQH4t1cXlPYg63q-q1UDYgfUII2gU4zLtaN4r7X8gZ30Fe0kesW_46TT81A73'],{ title: 'Good morning', msg: 'Log your breakfast' })

module.exports = sendNotification;





