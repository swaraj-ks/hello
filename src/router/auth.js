'use strict';

const express = require('express');
const auth = require('../controller/auth');
const Route = express.Router();


Route
    .get('/logout', auth.logout)


module.exports = Route;
