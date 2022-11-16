'use strict';

const express = require('express');
const cart = require('../controller/cart');
const Route = express.Router();

Route
    .post('/test',cart.test)
  .post('/',cart.add_cart)
  .put('/:id',cart.updateCart)
  .get('/:id',cart.getCart)
  .delete('/:id',cart.deleteCart)
  .delete('/deleteAll/:id',cart.deleteAll)




module.exports = Route;

//   .patch('/account/role/:searchString/:role', AccountCtrl.role)