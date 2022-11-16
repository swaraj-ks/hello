'use strict';
// const db = require('../../bin/database');
var async = require('async');
// const select = require('../queries/select');
// const insert = require('../queries/insert');
// const update = require('../queries/update');
// const dele = require('../queries/delete');
const output = require('../helper/api');
const mongoose = require('mongoose');
const TrainingModel = require('../model/trainingcenter.model');
const InstituteModel = require('../model/Institutions.model');
const programmesModel = require('../model/trainingprograms.model');
const enrolmentModel = require('../model/enrolment.model');



class TrainingController {
    constructor(con) {
        this.config = con;
    }

    add_training_center(req, res) {
        try {
            console.log(req.body, 'rew')
            if (Object.keys(req.body).length) {
                // let save_center = TrainingModel(req.body);
                // save_center.save((err, data) => {
                //     if (err) output.serverError(req, res, err);
                //     else output.ok(req, res, data, "saved", 1)
                // })
                TrainingModel.findOneAndUpdate({name:req.body.name},{$set:req.body},{upsert:true})
                .exec((err,data)=>{
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "saved", 1)
                })

            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }
    
    get_training_center(req, res) {
        TrainingModel.find()
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "saved", 1)
            })
    }

    edit_training_programme(req,res){
      try {
            if (Object.keys(req.body).length) {
                programmesModel.findByIdAndUpdate({_id:req.params.edit_id},{$set:req.body})
                .exec((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "saved", 1)
                })
            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    
    }

    add_training_programme(req, res) {
        try {
            if (Object.keys(req.body).length) {
                let save_programme = programmesModel(req.body)
                save_programme.save((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "saved", 1)
                })
            } else {
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    get_training_programme(req, res) {
        programmesModel.find({ status: true })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "saved", 1)
            })
    }

    search_traning_center(req, res) {
        const regexw = new RegExp(['^', req.params.name, '$'].join(''), 'i');
        TrainingModel.find({ $and: [{ name: { $regex: req.params.name, $options: "$i" } }, { status: true }] })
            .limit(5)
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "saved", 1)
            })
    }
    programme_based_center(req, res) {
        programmesModel.find({ $and: [{ centers: { $regex: req.params.center_id, $options: "$i" } }, { status: true }] })
            .exec((err, data) => {
                if (err) output.serverError(req, res, err);
                else output.ok(req, res, data, "saved", 1)
            })
    }

    search_institute(req, res) {
        console.log(req.params.instituteName, 'req.params.instituteName')
        const regexw = new RegExp(['^', req.params.instituteName, '$'].join(''), 'i');

        InstituteModel.find({ $and: [{ Name: { $regex: req.params.instituteName, $options: "$i" } }, { status: true }] }, { Name: 1 })
            .limit(5)
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err); }

                else { output.ok(req, res, data, "saved", 1) }
            })
    }
    search_by_training(req, res) {

    }

    get_teacher_enrolled(req, res) {
        let temp = [];
        if (req.params.teacher_id) {
            temp.push(req.params.teacher_id)
            console.log(temp)
            enrolmentModel.aggregate([
                { $match: { members: { $in: temp } } },
                { "$addFields": { "id": { "$toObjectId": "$enrolment_programme" } } },
                {
                    $lookup: {
                        from: "training_programmes",
                        localField: "id",
                        foreignField: "_id",
                        as: "programme"
                    },
                },
            ])
                .exec((err, data) => {
                    if (err) { output.serverError(req, res, err); }
                    else { output.ok(req, res, data, "data", 1) }
                })
        } else {
            output.ok(req, res, [], "params empty", 1)
        }
    }
    delete_center(req,res){
        TrainingModel.remove({_id:req.params.id})
        .exec((err, data) => {
            if (err) { output.serverError(req, res, err); }
            else { output.ok(req, res, data, "removed", 1) }
        })
    }
    delete_prgramme(req,res){
        programmesModel.remove({_id:req.params.id})
        .exec((err, data) => {
            if (err) { output.serverError(req, res, err); }
            else { output.ok(req, res, data, "removed", 1) }
        })
    }
    get_endrolmentByprogramme(req,res){
        console.log(req.params.programme_id,'req.params.programme_id')
        enrolmentModel.aggregate([
            { $match: { enrolment_programme: req.params.programme_id } },
            { "$unwind": "$members" },
            { "$addFields": { "id": { "$toObjectId": "$members" } } },
            {
                $lookup: {
                    from: "teachers",
                    localField: "id",
                    foreignField: "_id",
                    as: "teachers_temp"
                },
            },
            { "$unwind": "$teachers_temp" },
            { "$group": {
                "_id": "$_id",
                "products": { "$push": "$members" },
                "teachers": { "$push": "$teachers_temp" }
            }}
        ])
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err); }
                else { output.ok(req, res, data, "data", 1) }
            })
    }

    get_institute_enrolled(req, res) {
        let temp = [];
        if (req.params.institute_id) {
            temp.push(req.params.institute_id)
            enrolmentModel.aggregate([
                { $match: { Institution_enrolment: req.params.institute_id } },
                { "$addFields": { "id": { "$toObjectId": "$enrolment_programme" } } },
                {
                    $lookup: {
                        from: "training_programmes",
                        localField: "id",
                        foreignField: "_id",
                        as: "programme"
                    },
                },
            ])
                .exec((err, data) => {
                    if (err) { output.serverError(req, res, err); }
                    else { output.ok(req, res, data, "data", 1) }
                })
        } else {
            output.ok(req, res, [], "params empty", 1)
        }
    }

    get_enrolment(req, res) {
        enrolmentModel.find({ enrolment_programme: req.params.programme_id })
            .exec((err, data) => {
                if (err) { output.serverError(req, res, err); }
                else { output.ok(req, res, data, "data", 1) }
            })
    }
    add_enrolment(req, res) {
        if (Object.keys(req.body).length) {
            // 0 => get_techer_by_institution;1=> institution
            if (req.params.option == "0" || req.params.option == 0) {
                var bulk = enrolmentModel.collection.initializeOrderedBulkOp()
                for (let programme of req.body.enrolment_programme) {
                    bulk.find({enrolment_programme: programme}).upsert().updateOne({ $push: { members: req.body.members[0] } })
                }
                bulk.execute((err, data) => {
                    if (err) output.serverError(req, res, err);
                    else output.ok(req, res, data, "saved", 1)
                })

            } else {
                enrolmentModel.updateMany({$and:[{ enrolment_programme: { $in: req.body.enrolment_programme  } },{ Institution_enrolment: req.body.Institution_enrolment }]}, { $set: { 'members': req.body.members, 'Institution_enrolment': req.body.Institution_enrolment } }, { upsert: true })
                    .exec((err, data) => {
                        if (err) output.serverError(req, res, err);
                        else output.ok(req, res, data, "saved", 1)
                    })
            }
        } else {
            output.ok(req, res, [], "no data found", 1)
        }
    }
}

module.exports = new TrainingController();
