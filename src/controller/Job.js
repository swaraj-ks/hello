'use strict';
// const db = require('../../bin/database');
var async = require('async');
// const select = require('../queries/select');
// const insert = require('../queries/insert');
// const update = require('../queries/update');
// const dele = require('../queries/delete');
const output = require('../helper/api');
const mail = require('../helper/mail');

const mongoose = require('mongoose');
const suggestModel = require('../model/suggest_model');
const teacherModel = require('../model/Teachers.model');
const applicationModel = require('../model/apply_jobs.model');



class JobController {
    constructor(con) {
        this.config = con;
    }

    selectCandidate(req,res){
        var rp = require('request-promise');
        try {
            console.log(req.body.value,req.body)
            if(req.body.value && req.body.value.length){
                console.log("changes")
                async.parallel({
                    sendMail: function(callback) {
                        mail(req,res,req.body.emails,req.body.details,'Application Status',(error,data)=>{
                            if(error) callback(error,[])
                             else callback(null, data);
                        })
                    },
                    // sendSms: function(callback) {
                    //     teacherModel.find({Email:{$in:req.body.emails}},{Phone_Number:1})
                    //     .exec((err,data)=>{
                    //         if(err){callback(err,[])}
                    //         else {
                    //             console.log(data,'data')
                    //             if(data.length){
                    //             for(let x=0;x < data.length; x ++){
                    //                 console.log(data[x].Phone_Number,'x')
                    //                 let url = "https://api.msg91.com/api/sendhttp.php?authkey=338590AxCFHU9rFf5f326bf6P1&mobiles="+data[x].Phone_Number+"&country=91&message="+req.body.details.date+" , "+req.body.details.location +", phone :"+req.body.details.phone+"&sender=Campus&route=4"
                    //                          rp(url)
                    //                             .then(function (htmlString) {
                    //                                 // Process html...
                    //                             })
                    //                             .catch(function (err) {
                    //                                 // Crawling failed...
                    //                             });
                    //             }
                    //             callback(null,[])
                    //         }else{
                    //             callback(null,[])
                    //         }
                    //         }
                    //     })

                    // },
                    updateStatus: function(callback) {
                        suggestModel.updateMany({_id:{ $in: req.body.value }},{$set:{'select_status':true,'details':req.body.details}})
                        .exec((err,data)=>{
                            if(err) callback(err,[]) ;
                            else callback(null,data) 
                        })

                    }
                }, function(err, results) {
                    if(err){ output.serverError(req, res, err)}else{ output.ok(req, res, results, "saved", 1)}
                });
         
        }else{
            output.ok(req, res, [], "Value are missing", 1)
        }
    } catch (ex) { output.serverError(req, res, ex) }
    }

    update_view_status(req,res){
        suggestModel.updateMany({user_id:req.params.user_id},{$set:{'isViewed':true}})
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }

    appliedJob(req,res){
        applicationModel.find({user_id:req.params.id})
        .find((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }

    reponse_status(req,res){
        console.log('job response')
        if(req.params.id){
            suggestModel.find({$and:[{user_id:req.params.id},{select_status:true}]})
            .exec((err,data)=>{
                if(err){output.serverError(req, res,err)}
                else{output.ok(req, res, data, "data", 1)}
            })
        }else{
            output.serverError(req, res, 'Id missing')
        }
    }

    applicantList(req,res){
        try {
                suggestModel.find({'job_id':req.params.job_id})
                .exec((err,data)=>{
                    if(err)output.serverError(req, res, err);
                    else  output.ok(req, res, data, "saved", 1)
                })
        } catch (ex) { output.serverError(req, res, ex) }
    }

    suggest_job(req, res) {
        try {
  
                suggestModel.insertMany(req.body.value,{ordered:true},(err,data)=>{
                         if(err)output.serverError(req, res, err);
                    else  output.ok(req, res, data, "saved", 1)
                })
  
        } catch (ex) { output.serverError(req, res, ex) }
    }

}

module.exports = new JobController();
