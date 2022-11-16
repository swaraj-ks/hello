'use strict';

var async = require('async');
const output = require('../helper/api');

const mongoose = require('mongoose');
const OrderModel = require('../model/order.model');
const Razorpay = require('razorpay');
const { serverError } = require('../helper/api');
const orderModel = require('../model/order.model');


class OrderController {
    constructor(con) {
        this.config = con;
        this.razorPay = new Razorpay({
            key_id: process.env.RAZOR_PAY_ID,
            key_secret: process.env.RAZOR_PAY_SECRET
        })
    }

    test(req,res){
        state.insertMany(req.body.tag)
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }

    getOrder(req,res){
        orderModel.find({user_id: req.params.user_id, "order_attr.amount_due":  0})
        .exec((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, data, "updated", 1)
        })
    }

    getAllOrder(req, res){
        orderModel.aggregate([
            {$match: {"order_attr.amount_due":  0}},
            {$addFields: { user_object_id : { $toObjectId: "$user_id" } }},
            { $lookup: {
                from: "teachers",
                localField: "user_object_id",
                foreignField: "_id",
                as: "teacher"
            }},
            { $lookup: {
                from: "institutions",
                localField: "user_object_id",
                foreignField: "_id",
                as: "institution"
            }}
          ])
        .exec((err,data)=>{

            if(err){
                output.serverError(req, res, err);
            } else {
                let filteredData = []
                for (let info of data) {
                    if (typeof info["programmes"][0] !== 'string') {
                        let tempData = {}
                        tempData["amount"] = info["amount"]
                        tempData["type"] = info.teacher.length ? "teacher" : "institution"
                        tempData["programmes"] = info["programmes"]
                        tempData["email"] = info[tempData["type"]][0]["Email"]  
                        tempData["phoneNumber"] = info[tempData["type"]][0]["Phone_Number"]  
                        tempData["createDate"] = info["create_date"]  
                        tempData["name"] = tempData["type"] === 'teacher' ? info[tempData["type"]][0]["First_name"] + ' ' 
                            +  info[tempData["type"]][0]["Last_name"] : info[tempData["type"]][0]["Name"]     
                        filteredData.push(tempData)
                    }
                }
                output.ok(req, res, filteredData, "updated", 1)
            }
        })
    }

    createOrder = async(req,res) => {
        let orderResponse = {
            amount: 0,
            amount_paid: 0,
            amount_due: 0
        };
        let requestBody = req.body
        
        if (typeof requestBody.amount != 'number') {
            output.serverError(req, res, "amount is required and should be a number")
        }

        if (requestBody.amount > 0) {
            try {
                orderResponse = await this.razorPay.orders.create({amount: requestBody.amount * 100})
            } catch(err) {
                output.serverError(req, res, err)
            }
        }
        
        let order = new OrderModel({amount: requestBody.amount, order_attr: orderResponse, 
                                    programmes: requestBody.programmes, 
                                    order_id: orderResponse.id,
                                    user_id: requestBody.userId})
        order.save((err,data)=>{
            if(err)output.serverError(req, res, err);
            else  output.ok(req, res, {'orderDetail': data, 'razorId': process.env.RAZOR_PAY_ID}, "updated", 1)
        })
    }
    
    updateOrder = async(req, res) => {
        await this.razorPay.orders.fetch(req.body.order_id)
        .then(response => {
            if(response) {
                OrderModel.findByIdAndUpdate(
                    {_id: req.params.id}, 
                    {$set: {'payment_details': req.body, 'order_attr': response}})
                .exec((err,data)=>{
                    if(err) throw err;
                    else  output.ok(req, res, data, "updated", 1)
                })        
            } else {
                console.log(response)
                throw Error('Could not process payment!')
            }
        })
        .catch(err => {
            output.serverError(req, res, err)
        })
    }
}

module.exports = new OrderController();
