'use strict';
// const db = require('../../bin/database');
var async = require('async');
// const select = require('../queries/select');
// const insert = require('../queries/insert');
// const update = require('../queries/update');
// const dele = require('../queries/delete');
const output = require('../helper/api');

const mongoose = require('mongoose');
const cartModel = require('../model/cart.model');
const state = require('../model/state.model');




class CartController {
    constructor(con) {
        this.config = con;
    }
    test(req,res){
        state.insertMany(req.body.tag)
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }
    add_cart(req,res){
        let cart = new cartModel(req.body)
        cart.save((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }
    
    updateCart(req,res){
        cartModel.findByIdAndUpdate({_id:req.params.id},{$set:req.body})
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }
    deleteCart(req,res){
        cartModel.findByIdAndRemove({_id:req.params.id})
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }
    getCart(req,res){
        cartModel.find({id:req.params.id})
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }
    deleteAll(req,res){
        cartModel.deleteMany({id:req.params.id})
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }
}

module.exports = new CartController();
