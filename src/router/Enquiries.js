'use strict';

const express = require('express');
const Enquiries = require('../controller/Enquiries');
const Route = express.Router();

Route
  .post('/',Enquiries.createNotification)


module.exports = Route;

//   .patch('/account/role/:searchString/:role', AccountCtrl.role)