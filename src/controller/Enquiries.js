'use strict';
// const db = require('../../bin/database');
var async = require('async');
// const select = require('../queries/select');
// const insert = require('../queries/insert');
// const update = require('../queries/update');
// const dele = require('../queries/delete');
const output = require('../helper/api');
const mongoose = require('mongoose');
const institutionModel = require('../model/Institutions.model');

class EnquiriesController {
    constructor(con) {
        this.config = con;
    }

    add_new_institution(req, res) {
        try {
            if(req.body.length){
                institutionModel.save((err,data)=>{
                    if(err)output.serverError(req, res, err);
                    else  output.ok(req, res, [], "saved", 1)
                })
            }else{
                output.ok(req, res, [], "invalid values", 1)
            }
        } catch (ex) { output.serverError(req, res, ex) }
    }

    get_
}

module.exports = new EnquiriesController();
