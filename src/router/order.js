'use strict';

const express = require('express');
const order = require('../controller/order');
const Route = express.Router();


Route
    .post('', order.createOrder)
    .put('/:id', order.updateOrder)
    .get('/:user_id', order.getOrder)
    .get('', order.getAllOrder)


module.exports = Route;
