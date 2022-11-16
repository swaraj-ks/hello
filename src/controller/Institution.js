'use strict';
// const db = require('../../bin/database');
var async = require('async');
// const select = require('../queries/select');
// const insert = require('../queries/insert');
// const update = require('../queries/update');
// const dele = require('../queries/delete');
const output = require('../helper/api');
const mail = require('../helper/mail');
const message = require('../helper/message');

const multer = require('multer');
const csvtojson = require("csvtojson");


const institutionModel = require('../model/Institutions.model');
const TeachersModel = require('../model/Teachers.model');
const loginModel = require('../model/login.model');
const jobModel = require('../model/Jobs.model');
const application = require('../model/apply_jobs.model')
const mongoose = require('mongoose');
const upload = require('../helper/uploder');
const storage = multer.memoryStorage();
var AWS = require('aws-sdk');
const request = require('request');
const cartModel = require('../model/cart.model');
// const multer = require('multer');
var time;
var time2;
let URL;

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage')
    },
    filename: function (req, file, cb) {
        time = file.fieldname + '.csv'
        cb(null, time)
        time2 = "http://3.6.144.94/chewy-media_storage/storage/" + time
        console.log("http://3.6.144.94/chewy-media_storage/storage/" + time)
        this.URL = "http://3.6.144.94/chewy-media_storage/storage/" + time

    }
});

const upload_csv = multer({ storage: storage2 }).single('data');



var upload_aws2 = multer({ storage: storage }).single('item_img');

var time;
var time2;

const storage_profile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profile')
    },
    filename: function (req, file, cb) {
        time = file.fieldname + '-' + Date.now() + '.png';
        cb(null, time)
        time2 = "localhost/site_storage/" + time
        console.log("localhost/site_storage/" + time)

    }
});
const upload_profile = multer({ storage: storage_profile }).single('profile');
class TeachersController {
    constructor(con) {
        // this.config = con;
    }


    // router.post('/add_csv', (req, res) => {
        add_csv(req, res) {
            upload_csv(req, res, (err) => {
            if (err) output.invalid(req, res, err)
            const file = req.file;
            // console.log(file);
            // let path = "/resources/static/assets/uploads/" + req.file.filename;
            csvtojson()
                .fromFile('./storage/data.csv')
                .then(csvData => {
                    if (csvData.length) {
                        for (let data of csvData) {
                            console.log(data)
                            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123';
                            var charactersLength = characters.length;
                            let randomId = ''
                            for (var i = 0; i < 10; i++) {
                                randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            data['id'] = randomId
                        }
                        institutionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.institution_id) }, { $push: { 'Faculties': { $each: csvData } } })
                        .exec((err, result) => {
                            if (err) output.serverError(req, res, err);
                            output.ok(req, res, result, "added", 1)
                        });
                    } else {
                        res.send("Data is empty")
                    }
    
                })
                .catch(err => output.serverError(req, res, err))
        })
    }
    // });



    upload_logo(req, res) {
        upload_profile(req, res, (err) => {
            if (err) output.invalid(req, res, err)

            if (Object.keys(req.body).length) {
                let low_img = time2
                req.body['Logo'] = time2;
                institutionModel.findByIdAndUpdate({ _id: req.body._id }, { $set: { 'Logo': time2 } })
                    .exec((err, data) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, data, "inserted", 1)
                    })
            }
        })
    }

    delete_job(req, res) {
        jobModel.findByIdAndRemove({ _id: req.params._id })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "inserted", 1)
            })
    }

    institution_reg(req, res) {
        try {
            console.log(req.body)
            if (Object.keys(req.body).length) {
                let login = {};
                login.Email = (req.body.Email) ? req.body.Email : null;
                login.Pass = (req.body.Pass) ? req.body.Pass : null;
                login.Phone_Number = (req.body.Phone_Number) ? req.body.Phone_Number : null;
                login.type = (req.body.type) ? req.body.type : null;

                // login.otp_verify = (req.body.signupFrom == "admin121") ? true : false;
                // login.email_verify = (req.body.signupFrom == "admin121") ? true : false;


                login.status = (req.body.type == 'teacher') ? true : false;
                let login_model = new loginModel(login)
                let institution_model = new institutionModel(req.body)
                login_model.save((err, data) => {
                    if (err) {output.serverError(req, res, err);}
                    else 
                   {
                    // institutionModel.findOneAndUpdate({Email:req.body.Email},{$set:req.body},{upsert:true})
                    // .exec((err, data) => {
                    //     if (err) { output.serverError(req, res, err); }
                    //     else { output.ok(req, res, data, "data", 1) }
                    // })
                        institution_model.save((err, data) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, data, "saved", 1)
                    })
                }
                })
            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    register_institution_list(req, res) {
        try {
            // 0=>non approved;1=>approved
            if (req.params.option == '1') {
                institutionModel.find({ $and:[{status: true },{email_verify:true},{otp_verify:true}]})
                    .exec((err, result) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, result, "list", 1)
                    })
            } else if (req.params.option == '0') {
                institutionModel.find({ $and:[{status: false },{email_verify:true},{otp_verify:true}]})
                    .exec((err, result) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, result, "list", 1)
                    })
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }
    approve_institution(req, res) {
        try {
            if (req.params.email) {
                loginModel.findOneAndUpdate({ Email: req.params.email }, { $set: { status: true } })
                    .exec((err, result) => {
                        institutionModel.findOneAndUpdate({ Email: req.params.email }, { $set: { status: true } })
                            .exec((err, result) => {

                                if (err) { output.serverError(req, res, err) }
                                else {

                                    mail(req, res, req.params.email, "Your request approved", 'Request status', (err, data) => {
                                        if (err) { output.serverError(req, res, err) }
                                        else { 
                                            
                                            output.ok(req, res, result, "list", 1) }
                                    })
                                }
                            })
                        // if(err)output.serverError(req, res, err);
                        // else  output.ok(req, res, result, "list", 1)
                    })
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    checkMail(req, res) {
        try {
            // if(req.params.email){
            loginModel.find({ Email: { $regex: req.params.email, $options: "i" } })
                .exec((err, result) => {

                    if (err) output.serverError(req, res, err);
                    else if (result.length) { output.ok(req, res, [], "Email already exist", 1) } else { output.ok(req, res, [], "New mail", 0) }
                })
            // }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    deleteFaculty(req, res) {
        try {
            institutionModel.update({ _id:  req.params.id}, 
                { "$pull": { "Faculties": { "id": req.params.facultyId } }}, { safe: true, multi:true })
                .exec((err, result) => {
                    if (err) {
                        output.serverError(req, res, err);
                    } else {
                        cartModel.updateMany({}, 
                            { "$pull": { "teachers": { "id": req.params.facultyId } }}, { safe: true, multi:true })
                            .exec((err, result) => {
                                if (err) output.serverError(req, res, err);
                                else output.ok(req, res, result, "deleted", 1)
                            })
                    }
                })
            
        } catch (ex) {
            console.log(ex)
            output.serverError(req, res, ex)
        }
    }



    create_Job(req, res) {
        try {
            if (Object.keys(req.body).length) {
                let job_model = new jobModel(req.body)
                job_model.save((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "saved", 1)
                })
            } else {
                output.ok(req, res, [], "no data found", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    job_application(req, res) {
        try {
            if (req.params.institution_id) {
                jobModel.find({ institution_id: req.params.institution_id })
                    .exec((err, data) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, data, "saved", 1)
                    })
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }
    dashboard_details(req, res) {
        try {
            institutionModel.find({ _id: mongoose.Types.ObjectId(req.params.id) })
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "data", 1)
                })
        } catch (ex) { output.serverError(req, res, ex) }
    }
    edit_institution(req, res) {
        try {
            if (req.params._id) {

                institutionModel.findByIdAndUpdate({ _id: req.params._id }, { $set: req.body })
                    .exec((err, data) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, data, "saved", 1)
                    })
            } else {
                output.ok(req, res, [], "id missing", 1)

            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    existing_faculti(req, res) {
        if (Object.keys(req.body).length) {
            institutionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.institution_id) }, { $push: { 'Faculties': { $each: req.body.Faculties } } })
                .exec((err, result) => {
                    if (err) output.serverError(req, res, err);
                    output.ok(req, res, result, "added", 1)
                });
        } else {
            output.ok(req, res, [], "No data", 0)

        }
    }

    upload_csv(req,res){
        upload(req, res, (err) => {
            if (err) output.invalid(req, res, err)
            const file = req.file;
            // console.log(file);
            // let path = "/resources/static/assets/uploads/" + req.file.filename;
            csvtojson()
                .fromFile('./storage/data.csv')
                .then(csvData => {
                    console.log(csvData);
                    if (csvData.length) {
                        total = csvData.length
                        keys = Object.keys(csvData[0])
                        // if (csvData[0].hasOwnProperty('PhoneNumber')) {
                            // studentModel.insertMany(csvData, (err, response) => {
                            //     if (err) res.send(err);
                            //     console.log(`Inserted: ${response.length} rows`);
                            //     res.json({'total rocard':total,'inserted':response.length})
                            // });
                        // } else {
                        //     res.send("phone number is required")
                        // }
                    } else {
                        res.send("Datais empty")
                    }
    
                });
        })
    }

    edit_option(req, res) {
        try {
            if (req.params.institution_id && req.params.option && req.params.selection) {
                // if (Object.keys(req.body).length && req.params.id && req.params.option) {
                let option_value = String(req.params.option);
                let updateValue = {};
                let updateValue_ = {};
                updateValue[option_value] = req.body[req.params.option];
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123';
                var charactersLength = characters.length;
                for (var i = 0; i < 10; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                // thisUser[0]['_doc']['key'] = result;
                updateValue[option_value]['id'] = result;
                console.log(req.body, 'Experience', updateValue)
                let option_key = {};
                option_key[option_value] = { 'id': req.params.key }
                //  updateValue_[option_value] = updateValue;
                institutionModel.update({ _id: mongoose.Types.ObjectId(req.params.institution_id) }, { $pull: option_key })
                    .exec((err, data) => {
                        if (err) {
                            output.serverError(req, res, err);
                        }
                        else {
                            // 0 => delete ;1 => edit ;2 => new 
                            console.log(req.params.selection, typeof req.params.selection)
                            if (req.params.selection == '0') {
                                output.ok(req, res, data, "deleted", 1)
                            } else if (req.params.selection == '1') {

                                updateValue[option_value]['id'] = req.params.key;

                                institutionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.institution_id) }, { $push: updateValue })
                                    .exec((err, result) => {
                                        if (err) output.serverError(req, res, err);
                                        output.ok(req, res, result, "updated", 1)
                                    });

                            } else if (req.params.selection == '2') {
                                institutionModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.institution_id) }, { $push: updateValue })
                                    .exec((err, result) => {
                                        if (err) output.serverError(req, res, err);
                                        output.ok(req, res, result, "added", 1)
                                    });
                            }
                        }
                    })
                // } else {
                //     output.ok(req, res, [], "invalid values", 1)
                // }




                // institutionModel.findByIdAndUpdate({_id:req.params._id},{$set:req.body})
                // .exec((err,data)=>{
                //     if(err)output.serverError(req, res, err);
                //     else output.ok(req, res, data, "saved", 1)
                // })
            } else {
                output.ok(req, res, [], "id missing", 1)

            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    delete_institution(req, res) {
        if (req.params._id) {
            institutionModel.findByIdAndRemove({ _id: req.params._id })
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else 
                        if(data){
                            loginModel.remove({Email:data.Email})
                            .exec((err,data)=>{
                                output.ok(req, res, data, "data", 1)
                            })
                        }else{
                            output.ok(req, res, data, "data", 1)

                        }
                })
        }
    }
    edit(req, res) {
        if (req.params._id) {
            // application.find({_id:mongoose.Types.ObjectId(req.params.job_id)})
            institutionModel.findByIdAndUpdate({ _id: req.params._id }, { $set: req.body })

                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "edited", 1)
                })
        } else {
            output.ok(req, res, [], "id missing", 1)

        }
    }
    application_recevie(req, res) {
        if (req.params.job_id) {
            // application.find({_id:mongoose.Types.ObjectId(req.params.job_id)})
            application.find({ job_id: req.params.job_id })

                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "saved", 1)
                })
        }
    }
    search(req, res) {
        if (req.params.name) {
            const regex = { $regex: new RegExp('^' + req.params.name.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i') };
            const regex2 = new RegExp(['^', req.params.name, '$'].join(''), 'i');

            // console.log(req.params.name,'req.params.name',regex)
            institutionModel.find({ $and: [{ $or: [{ Name: { $regex: req.params.name, $options: "i" } }, { Email: { $regex: req.params.name, $options: "i" } }] }, { status: true }] })
                .limit(4)
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "search data", 1)
                })
        } else {
            output.ok(req, res, [], "Name missing", 1)
        }
    }
    get_Job(req, res) {
        if (req.params.id) {
            jobModel.find({ $and: [{ institution_id: req.params.id }, { "status": true }] })
                .exec((err, data) => {

                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "data", 1)
                })
        } else {
            output.ok(req, res, [], "Id missing", 1)
        }
    }
    get_applicant(req, res) {
        application.find({ status: 1 })
            .exec((err, result) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, result, "data", 1)
            })
    }

    get_applicant_job_id(req, res) {
        application.find({ $and: [{ job_id: req.params.job_id }, { status: 1 }] })
            .exec((err, result) => {
                if (err) { output.serverError(req, res, err); }
                else { output.ok(req, res, result, "data", 1) }
            })
    }

    Job_list_filter(req, res) {
        application.aggregate([{ $match: { user_id: req.params.teacher_id } },
        {
            $group:
            {
                _id: "$user_id",
                data: { $push: "$job_id" }
            }
        },
        ])
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err); }
                else {
                    console.log(data[0]);
                    if (data.length) {
                        jobModel.find({ _id: { $nin: data[0].data } })
                            .exec((err, result) => {
                                if (err) console.log(err)
                                else output.ok(req, res, result, "data", 1)
                            })
                    } else {
                        jobModel.find()
                            .exec((err, result) => {
                                if (err) console.log(err)
                                else output.ok(req, res, result, "data", 1)
                            })
                    }
                }
            })
    }
    Job_list(req, res) {
        try {
            // application.aggregate({_id:'item.id'}
            //     // { $match: {} },
            //     // { $unwind: '$food' },
            //     // { "$addFields": { "ing_id": { "$toObjectId": "$food._id" } } },
            //     // { "$addFields": { "all": "$food.all" } },
            //     // {
            //     //   $lookup: {
            //     //     from: "products",
            //     //     localField: "ing_id",
            //     //     foreignField: "_id",
            //     //     as: "consumedFoods"
            //     //   },
            //     // },
            // )
            jobModel.find()
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "data", 1)
                })
        } catch (ex) { output.serverError(req, res, ex) }
    }

    upload_profile(req, res) {
        // new Promise(function (resolve, reject) {
        upload_aws2(req, res, (err) => {
            if (err) output.invalid(req, res, err)
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
                        output.invalid(req, res, err)

                        //   res.status(500).json({ error: true, Message: err });
                    } else {
                        var newFileUploaded = {
                            description: req.body.description,
                            fileLink: s3FileURL + file.originalname,
                            s3_key: params.Key
                        };
                        console.log(newFileUploaded, 'newFileUploaded')
                        if (Object.keys(req.body).length) {
                            // let low_img = time2
                            req.body['Logo'] = (data) ? s3FileURL + file.originalname : ' ';

                            institutionModel.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body })
                                .exec((err, data) => {
                                    if (err) { output.serverError(req, res, err); }
                                    else { output.ok(req, res, data, "inserted", 1) }
                                });

                        }
                    }
                })
            } else {
                institutionModel.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body })
                    .exec((err, data) => {
                        if (err) { output.serverError(req, res, err); }
                        else { output.ok(req, res, data, "inserted", 1) }
                    });

            }
        })






        // upload(req, res, function (err, data) {

        //     // upload_profile2(req, res, (err,data) => {
        //     if (err) { console.log(err); output.invalid(req, res, err) }
        //     console.log(data, 'data')
        //     if (Object.keys(req.body).length) {
        //         // let low_img = time2
        //         console.log(req.body, 'req body')
        //         req.body['Logo'] = (data) ? 'http://127.0.0.1/campus_api/storage/' + data.originalname : ' ';
        //         // req.body['Profile_pic'] = time2;
        //         // if(req.body['Faculties'] && req.body['Facilities'] && req.body['TieuPs'] && req.body['Achievement']  && req.body['Placement']){
        //         //     if(typeof req.body['Faculties'] == 'string'){
        //         //         req.body['Faculties'] = JSON.parse(req.body['Faculties'])
        //         //     }
        //         //     if(typeof req.body['Facilities'] == 'string'){
        //         //         req.body['Facilities'] = JSON.parse(req.body['Facilities'])
        //         //     }
        //         //     if(typeof req.body['TieuPs'] == 'string'){
        //         //         req.body['TieuPs'] = JSON.parse(req.body['TieuPs'])
        //         //     }
        //         //     if(typeof req.body['Achievement'] == 'string'){
        //         //         req.body['Achievement'] = JSON.parse(req.body['Achievement'])
        //         //     }
        //         //     if(typeof req.body['Placement'] == 'string'){
        //         //         req.body['Placement'] = JSON.parse(req.body['Placement'])
        //         //     }
        //         // }
        //         institutionModel.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body })
        //             .exec((err, data) => {
        //                 if (err) { output.serverError(req, res, err); }
        //                 else { output.ok(req, res, data, "inserted", 1) }
        //             });
        //     }
        // })
    }

}
module.exports = new TeachersController();