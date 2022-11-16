'use strict';
// const db = require('../../bin/database');
var async = require('async');
const output = require('../helper/api');
const mongoose = require('mongoose');
const institutionModel = require('../model/Institutions.model');
const TeachersModel = require('../model/Teachers.model');
const loginModel = require('../model/login.model');
const jobModel = require('../model/Jobs.model');
const applyJob = require('../model/apply_jobs.model');
const upload = require('../helper/uploder');
const multer = require('multer');
const jwt = require('jwt-simple')
const storage = multer.memoryStorage();
var upload_aws = multer({ storage: storage }).single('file_id');
var upload_aws2 = multer({ storage: storage }).single('item_img');

// const upload_profile2 = multer({ storage: storage }).single('profile');

// load aws sdk
var AWS = require('aws-sdk');
var time;
var time2;

const storage_profile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profile')
    },
    filename: function (req, file, cb) {
        console.log(file, 'file')
        time = file.fieldname + '-' + Date.now() + '.png';
        cb(null, time)
        time2 = "http://127.0.0.1/campus_api/profile/" + time
        console.log("localhost/site_storage/" + time)

    }
});
const upload_profile2 = multer({ storage: storage_profile }).single('profile');


function jwt_encode(body) {
    return jwt.encode({'email': body.Email}, process.env.SECRET, process.env.SECRET_ALGORITHM)
}

class TeachersController {
    constructor(con) {
        // this.config = con;
    }

    teacher_reg(req, res) {
        try {
            console.log('sd')
            if (Object.keys(req.body).length) {

                let login = {};
                login.Email = (req.body.Email) ? req.body.Email : null;
                login.Pass = (req.body.Pass) ? req.body.Pass : null;
                login.Phone_Number = (req.body.Phone_Number) ? req.body.Phone_Number : null;
                login.type = (req.body.type) ? req.body.type : null;
                login.status = (req.body.type == 'teacher') ? true : false;

                // login.otp_verify = (req.body.signupFrom == "admin121") ? true : false;
                // login.email_verify = (req.body.signupFrom == "admin121") ? true : false;

                let login_model = new loginModel(login)
                let teacher_model = new TeachersModel(req.body)
                login_model.save((err, data) => {
                    if (err) output.serverError(req, res, err);
                    teacher_model.save((err, data) => {
                        if (err) { output.serverError(req, res, err); }
                        else { output.ok(req, res, data, "saved", 1) }
                    })
                    // TeachersModel.findOneAndUpdate({Email:req.body.Email},{$set:req.body},{upsert:true})
                    // .exec((err, data) => {
                    //     if (err) { output.serverError(req, res, err); }
                    //     else { output.ok(req, res, data, "data", 1) }
                    // })
                })

            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }
    edit_teacher(req, res) {
        if (Object.keys(req.body).length && req.params._id) {
            TeachersModel.findByIdAndUpdate({ _id: req.params._id }, { $set: req.body })
                .exec((err, data) => {
                    if (err) { output.serverError(req, res, err); }
                    else { output.ok(req, res, data, "data", 1) }
                })
        } else {
            output.ok(req, res, [], "value missing", 0)
        }
    }
    delete_teacher(req, res) {
        if (req.params._id) {
            TeachersModel.findByIdAndRemove({ _id: req.params._id })
                .exec((err, data) => {
                    if (err) { output.serverError(req, res, err); }
                    else { output.ok(req, res, data, "data", 1) }
                })
        }
    }

    login(req, res) {
        if (Object.keys(req.body).length) {
            if (req.body.Email === process.env.ADMIN_USER_ID && req.body.Pass == process.env.ADMIN_PASSWORD) {
                try {
                    res.cookie('session', jwt_encode(req.body), {
                        httpOnly: true,
                        secured: process.env.ENV === 'prod'
                    })
                    return output.ok(req, res, {}, "login pass", 1) 
                } catch (err) {
                    return output.serverError(req, res, err);
                }
            }

            loginModel.find({ $and: [{ Email: req.body.Email }, { Pass: req.body.Pass }] }, { Email: 1, Phone_Number: 1, type: 1, otp_verify: 1, email_verify: 1, status: 1 })
                .exec((err, result) => {
                    if (err) output.serverError(req, res, err);

                    if (result.length) {
                        if (result[0].status == true && result[0].otp_verify == true && result[0].email_verify == true) {
                            console.log(result, 'ss')
                            if (result[0].type == 'teacher') {
                                TeachersModel.find({ Email: result[0].Email })
                                    .exec((err, data) => {
                                        data[0]['_doc'].type = (data.length) ? 'teacher' : 'null';
                                        if (err) { output.serverError(req, res, err); }
                                        else { 
                                            res.cookie('session', jwt_encode(req.body), {
                                                httpOnly: true,
                                                secured: process.env.ENV === 'prod'
                                            })
                                            console.log(res.header)
                                            output.ok(req, res, data, "login pass", 1) 
                                        }
                                    })
                            } else {
                                institutionModel.find({ Email: result[0].Email })
                                    .exec((err, data) => {
                                        data[0]['_doc'].type = (data.length) ? 'institution' : 'null';
                                        if (err) { output.serverError(req, res, err); }
                                        else { 
                                            res.cookie('session', jwt_encode(req.body), {
                                                httpOnly: true,
                                                secured: process.env.ENV === 'prod'
                                            })
                                            console.log(res.header)

                                            output.ok(req, res, data, "login pass", 1) 
                                        }
                                    })
                            }
                        } else {
                            output.ok(req, res, result, "login faill", 0)
                        }
                    } else {
                        output.ok(req, res, result, "No data found", 0)

                    }
                })
        }
    }

    get_techer_by_institution(req, res) {

        TeachersModel.find({ Experience: { $elemMatch: { institution_id: req.params.institution_id } } })
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err) }
                else { output.ok(req, res, data, "saved", 1) }
            })
    }

    applying_job(req, res) {
        new Promise(function (resolve, reject) {

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
                                req.body['resume_path'] = (data) ? s3FileURL + file.originalname : ' ';
                                console.log(req.body)
                                TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.user_id) }, { $set: { 'Resume': req.body.resume_path } })
                                    .exec((err, data) => {
                                        let job = new applyJob(req.body)
                                        job.save((err, data) => {
                                            if (err) { reject(output.serverError(req, res, err)) }
                                            else { resolve(output.ok(req, res, data, "saved", 1)) }
                                        })
                                    })
                            }
                        }
                    })
                } else {
                    output.serverError(req, res, "file not found");
                }
            })


            // upload(req, res, function (err, data) {
            //     if (Object.keys(req.body).length) {
            //         console.log(data, 'data')
            //         if (data.originalname) {
            //             req.body['resume_path'] = (data) ? 'http://127.0.0.1/campus_api/storage/' + data.originalname : ' ';
            //             console.log(req.body)
            //             TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.user_id) }, { $set: { 'Resume': req.body.resume_path } })
            //                 .exec((err, data) => {
            //                     let job = new applyJob(req.body)
            //                     job.save((err, data) => {
            //                         if (err) { reject(output.serverError(req, res, err)) }
            //                         else { resolve(output.ok(req, res, data, "saved", 1)) }
            //                     })
            //                 })
            //         } else {
            //             output.ok(req, res, [], "upload resume", 1)
            //         }
            //     }
            // });
        });
    }

    delete_details(req, res) {
        try {
            if (Object.keys(req.body).length && req.params.id && req.params.option) {
                let option_value = String(req.params.option);
                let updateValue = {};
                updateValue[option_value] = req.body[req.params.option];
                console.log(req.body, 'Experience')
                TeachersModel.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
                    .exec((err, result) => {
                        if (err) { output.serverError(req, res, err); }
                        output.ok(req, res, result, "details", 1)
                    });
            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    update_qualification(req, res, callback) {

    }

    update_details(req, res) {
        try {
            // console.log("called",req.body)
            const updateValue = {};
            if (true) {

                let option_value = String(req.params.option);

                let updateValue_ = {};
                // updateValue = req.body
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$';
                var charactersLength = characters.length;

                for (var i = 0; i < 10; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                // thisUser[0]['_doc']['key'] = result;

                if (option_value == 'Qualification') {

                    upload_aws(req, res, (err) => {
                        if (err) output.invalid(req, res, err)
                        console.log(req.body, 'mm')
                        const file = req.file;
                        if (file) {
                            updateValue[option_value] = JSON.parse(req.body[req.params.option]);

                            updateValue[option_value]['id'] = result;

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
                                        console.log(s3FileURL + file.originalname)
                                        updateValue[option_value]['data_path'] = s3FileURL + file.originalname;
                                        TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: updateValue })
                                            .exec((err, result) => {
                                                if (err) output.serverError(req, res, err);
                                                output.ok(req, res, result, "details", 1)
                                            });
                                    }
                                    //   res.send({ data });
                                }
                            })
                        } else {
                            output.ok(req, res, [], "file missing", 1)
                        }


                    })


                } else {
                    updateValue[option_value] = req.body[req.params.option];
                    updateValue[option_value]['id'] = result;

                    console.log(req.body, 'Experience', updateValue)
                    updateValue_[option_value] = updateValue;
                    TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: updateValue })
                        .exec((err, result) => {
                            if (err) output.serverError(req, res, err);
                            output.ok(req, res, result, "details", 1)
                        });
                }
            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }


    edit_details(req, res) {
        try {
            if (req.params.id && req.params.option && req.params.key && req.params.selection) {

                const option_value = String(req.params.option);
                var updateValue = {};
                var quary = {}
                quary[option_value + '.$.id'] = req.params.key

                let option_key = {};
                option_key[option_value] = { 'id': req.params.key }
                // {option_value:{id:req.params.key}}
                console.log(option_key, 'option_key')

                if (option_value == 'Qualification') {

                    upload_aws(req, res, (err) => {
                        if (err) output.invalid(req, res, err)
                        console.log(req.body, 'mm')
                        const file = req.file;
                        updateValue[option_value] = JSON.parse(req.body[req.params.option]);
                        updateValue[option_value]['id'] = req.params.key;

                        if (file && file != '') {

                            // updateValue[option_value]['id'] = result;

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
                                        console.log(s3FileURL + file.originalname)
                                        updateValue[option_value]['data_path'] = s3FileURL + file.originalname;
                                        TeachersModel.update({ _id: mongoose.Types.ObjectId(req.params.id) }, { $pull: option_key })
                                            .exec((err, result) => {
                                                // 0 => delete
                                                if (req.params.selection == 0 || req.params.selection == '0') {
                                                    if (err) output.serverError(req, res, err);
                                                    output.ok(req, res, result, "deleted", 1)
                                                } else {
                                                    TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: updateValue })
                                                        .exec((err, result) => {
                                                            if (err) output.serverError(req, res, err);
                                                            output.ok(req, res, result, "details", 1)
                                                        });
                                                }
                                            });
                                    }
                                    //   res.send({ data });
                                }
                            })
                        } else {
                            TeachersModel.update({ _id: mongoose.Types.ObjectId(req.params.id) }, { $pull: option_key })
                                .exec((err, result) => {
                                    // 0 => delete
                                    if (req.params.selection == 0 || req.params.selection == '0') {
                                        if (err) output.serverError(req, res, err);
                                        output.ok(req, res, result, "deleted", 1)
                                    } else {
                                        TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: updateValue })
                                            .exec((err, result) => {
                                                if (err) output.serverError(req, res, err);
                                                output.ok(req, res, result, "details", 1)
                                            });
                                    }
                                });
                        }

                    })

                } else {
                    updateValue[option_value]['id'] = req.params.key;

                    updateValue[option_value] = req.body[req.params.option];

                    TeachersModel.update({ _id: mongoose.Types.ObjectId(req.params.id) }, { $pull: option_key })
                        .exec((err, result) => {
                            // 0 => delete
                            if (req.params.selection == 0 || req.params.selection == '0') {
                                if (err) output.serverError(req, res, err);
                                output.ok(req, res, result, "deleted", 1)
                            } else {
                                TeachersModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $push: updateValue })
                                    .exec((err, result) => {
                                        if (err) output.serverError(req, res, err);
                                        output.ok(req, res, result, "details", 1)
                                    });
                            }
                        });
                }
            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }


    teacharList(req, res) {
        try {
            TeachersModel.find()
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "data", 1)
                })
        } catch (ex) { output.serverError(req, res, ex) }
    }

    deleteTeacher(req, res) {
        try {
            TeachersModel.findByIdAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
                .exec((err, data) => {
                    if (err) { output.serverError(req, res, err); }
                    else {
                        if(data){
                            loginModel.remove({Email:data.Email})
                            .exec((err,data)=>{
                                output.ok(req, res, data, "data", 1)
                            })
                        }else{
                            output.ok(req, res, data, "data", 1)

                        }
                        
                         }
                })
        } catch (ex) { output.serverError(req, res, ex) }
    }
    dashboard_details(req, res) {
        try {
            TeachersModel.find({ _id: mongoose.Types.ObjectId(req.params.id) })
                .exec((err, data) => {
                    if (err) { output.serverError(req, res, err); }
                    else { output.ok(req, res, data, "data", 1) }
                })
        } catch (ex) { output.serverError(req, res, ex) }
    }
    Job_list(req, res) {
        jobModel.find()
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err); }
                else { output.ok(req, res, data, "data", 1) }
            })
    }
    certificate_verificatino(req, res) {
        TeachersModel.find({ Qualification: { $elemMatch: { certificate_id: req.params.certificate_id } } })
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err) }
                else {
                    if (data.length >= 1) {
                        output.ok(req, res, [], "Certificate already register", 0)
                    } else { output.ok(req, res, [], "Not found", 1) }
                }
            })

    }

    search(req, res) {
        if (req.params.name) {
            const regex = { $regex: new RegExp('^' + req.params.name.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i') };
            const regex2 = new RegExp(['^', req.params.name, '$'].join(''), 'i');

            // console.log(req.params.name,'req.params.name',regex)
            TeachersModel.find({ $or: [{ First_name: { $regex: req.params.name, $options: "i" } }, { Email: { $regex: req.params.name, $options: "i" } }] })
                .limit(4)
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "search data", 1)
                })
        } else {
            output.ok(req, res, [], "Name missing", 1)
        }
    }
    upload_profile__tr(req, res) {
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
                            req.body['Profile_pic'] = (data) ? s3FileURL + file.originalname : ' ';
                            if (req.body['Experience'] && req.body['Qualification'] && req.body['Certification']) {
                                if (typeof req.body['Experience'] == 'string') {
                                    req.body['Experience'] = JSON.parse(req.body['Experience'])
                                }
                                if (typeof req.body['Qualification'] == 'string') {
                                    req.body['Qualification'] = JSON.parse(req.body['Qualification'])
                                }
                                if (typeof req.body['Certification'] == 'string') {
                                    req.body['Certification'] = JSON.parse(req.body['Certification'])
                                }
                            }
                            TeachersModel.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body })
                                .exec((err, data) => {
                                    if (err) { output.serverError(req, res, err); }
                                    else { output.ok(req, res, data, "inserted", 1) }
                                });

                        }
                    }
                })
            } else {
                if (req.body['Experience'] && req.body['Qualification'] && req.body['Certification']) {
                    if (typeof req.body['Experience'] == 'string') {
                        req.body['Experience'] = JSON.parse(req.body['Experience'])
                    }
                    if (typeof req.body['Qualification'] == 'string') {
                        req.body['Qualification'] = JSON.parse(req.body['Qualification'])
                    }
                    if (typeof req.body['Certification'] == 'string') {
                        req.body['Certification'] = JSON.parse(req.body['Certification'])
                    }
                }
                TeachersModel.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body })
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
        //         req.body['Profile_pic'] = (data) ? 'http://127.0.0.1/campus_api/storage/' + data.originalname : ' ';
        //         // req.body['Profile_pic'] = time2;

        //     } else {

        //     }
        // });
    }
}
module.exports = new TeachersController();