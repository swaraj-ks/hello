'use strict';
// const db = require('../../bin/database');
var async = require('async');
const output = require('../helper/api');
const mongoose = require('mongoose');
const bannerModel = require('../model/banners.model');
const designationsModel = require('../model/Designations.model');
const districtModel = require('../model/district.model');
const enquiresModel = require('../model/Enquiries.model');
const newssModel = require('../model/news.model');
const testModel = require('../model/testtimonial.model');


const qualificarionModel = require('../model/Qualifications.model');

const stateModel = require('../model/state.model');
const TrainingModel = require('../model/Training.model');
const universitiesModel = require('../model/Universities.model');

const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }).single('item_img');
// const upload_profile2 = multer({ storage: storage }).single('profile');

// load aws sdk
var AWS = require('aws-sdk');
const subjectModel = require('../model/subject.model');
// const upload = require('../helper/uploder');

// const multer = require('multer');
// var time;
// var time2;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './banners')
//     },
//     filename: function (req, file, cb) {
//         time = file.fieldname + '-' + Date.now() + '.png';
//         cb(null, time)
//         time2 = "http://3.6.95.50/campus_api/banners/" + time
//         console.log("localhost/banners/" + time)

//     }
// });


// const upload = multer({ storage: storage }).single('item_img');

class siteManagerController {
    constructor(con) {
        // this.config = con;
    }
    upload_profile(req,res){

    }

    create_district(req, res) {
        districtModel.findOneAndUpdate({ name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    get_district(req, res) {
        districtModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data ", 1)
            })
    }
    delete_district(req,res){
        districtModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    create_universities(req, res) {
        universitiesModel.findOneAndUpdate({ name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    get_universities(req, res) {
        universitiesModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    delete_universities(req,res){
        universitiesModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    create_state(req, res) {
        stateModel.findOneAndUpdate({ name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data insertes", 1)
        })
    }

    get_state(req, res) {
        stateModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    delete_state(req,res){
        stateModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    create_sub(req, res) {
        subjectModel.findOneAndUpdate({ name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data insertes", 1)
        })
    }

    get_sub(req, res) {
        subjectModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    delete_sub(req,res){
        subjectModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    create_qualification(req, res) {
        console.log(req.params.name,'name: req.params.name')
        qualificarionModel.findOneAndUpdate({name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    get_qualification(req, res) {
        qualificarionModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    delete_qualification(req,res){
        qualificarionModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            console.log(data,err)
            if (err) output.serverError(req, res, err);
            
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    create_designation(req, res) {
        designationsModel.findOneAndUpdate({name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }

    get_designation(req, res) {
        designationsModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    delete_designation(req,res){
        designationsModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }

    create_enquirie(req, res) {
        // enquiresModel.findOneAndUpdate({ name: req.params.name }, { $set: { name: req.params.name } }, { upsert: true })

        // enquiresModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.name) }, { $set: { name: req.body } }, { upsert: true })
        // .exec((err, data) => {
        //     if (err) output.serverError(req, res, err);
        //     else output.ok(req, res, data, "data insertes", 1)
        // })
        let enquiresModel_ = new enquiresModel(req.body);
        enquiresModel_.save((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "inserted", 1)

        })
    }

    get_enquirie(req, res) {
        enquiresModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "data insertes", 1)
            })
    }
    delete_enquirie(req,res){
        enquiresModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
create_training(req, res) {
    TrainingModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { name: req.body } }, { upsert: true })
    .exec((err, data) => {
        if (err) output.serverError(req, res, err);
        else output.ok(req, res, data, "data insertes", 1)
    })
        // let TrainingModel_ = new TrainingModel(req.body);
        // TrainingModel_.save((err, data) => {
        //     if (err) output.serverError(req, res, err);
        //     else output.ok(req, res, data, "inserted", 1)

        // })
    }
    get_training(req, res) {
        let TrainingModel_ = new TrainingModel(req.body);
        TrainingModel.find((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "inserted", 1)

        })
    }
    delete_training(req,res){
        TrainingModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    
    
    createBanner(req,res){
        console.log('hits')
        upload(req, res, (err) => {
            if (err) output.invalid(req, res, err)
            const file = req.file;
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
              s3bucket.upload(params, function(err, data) {
                if (err) {
                        output.invalid(req, res, err)

                //   res.status(500).json({ error: true, Message: err });
                } else {
                  var newFileUploaded = {
                    description: req.body.description,
                    fileLink: s3FileURL + file.originalname,
                    s3_key: params.Key
                  };
                  console.log(newFileUploaded,'newFileUploaded')
                  if (Object.keys(req.body).length) {
                    // let low_img = time2
                    req.body['image_path'] = s3FileURL + file.originalname;
                    let bannerModel_ = new bannerModel(req.body)
                    bannerModel_.save((err,data)=>{
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, data, "inserted", 1)
                    })
                }
                //   res.send({ data });

                }
                })

        })
    }


    
    get_banner(req,res){
        bannerModel.find()
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data insertes", 1)
        })
    }
    delete_banner(req,res){
        bannerModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }
    create_Testimonials(req,res){
        if(Object.keys(req.body).length){
            let test = new testModel(req.body)
            test.save((err,data)=>{
                if(err){
             output.serverError(req, res, err);
                }else{
                    output.ok(req, res, data, "data added", 1)
                }
            })
        }else{
             output.serverError(req, res, 'no data');
            
        }
    }

    get_Testimonials(req,res){
        testModel.find()
        .exec((err,data)=>{
            if(err){
                output.serverError(req, res, err);
                   }else{
                       output.ok(req, res, data, "data", 1)
                   }
        })
    }

    createNews(req,res){
        upload(req, res, (err) => {
            if (err) output.invalid(req, res, err)
           
        if (Object.keys(req.body).length) {
            // let low_img = time2/
            // req.body['image_path'] = time2;
            let newssModel_ = new newssModel(req.body)
            newssModel_.save((err,data)=>{
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "inserted", 1)
            })
        }
        })
    }
    get_news(req,res){
        newssModel.find()
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data insertes", 1)
        })
    }
    delete_news(req,res){
        newssModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
        .exec((err, data) => {
            if (err) output.serverError(req, res, err);
            else output.ok(req, res, data, "data remove", 1)
        })
    }

}
module.exports = new siteManagerController();