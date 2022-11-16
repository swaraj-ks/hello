'use strict';

const express = require('express');
const simanagement = require('../controller/siteManager');
const Route = express.Router();


Route
  .get('/district/:id/:name',simanagement.create_district)
  .get('/district',simanagement.get_district)
  .delete('/district/:id',simanagement.delete_district)
 
  .get('/universities',simanagement.get_universities)
  .get('/universities/:id/:name',simanagement.create_universities)
  .delete('/universities/:id',simanagement.delete_universities)

  .get('/state/:id/:name',simanagement.create_state)
  .get('/state',simanagement.get_state)
  .delete('/state/:id',simanagement.delete_state)


  .get('/subject/:id/:name',simanagement.create_sub)
  .get('/subject',simanagement.get_sub)
  .delete('/subject/:id',simanagement.delete_sub)

  .get('/qualification/:id/:name',simanagement.create_qualification)
  .get('/qualification',simanagement.get_qualification)
  .delete('/qualification/:id',simanagement.delete_qualification)

  .get('/designation/:id/:name',simanagement.create_designation)
  .get('/designation',simanagement.get_designation)
  .delete('/designation/:id',simanagement.delete_designation)
  
  .post('/testimonials',simanagement.create_Testimonials)
  .get('/testimonials',simanagement.get_Testimonials)



  .post('/enquirie',simanagement.create_enquirie)
  .get('/enquirie',simanagement.get_enquirie)
  .delete('/enquirie/:id',simanagement.delete_enquirie)

  .post('/training',simanagement.create_training)
  .get('/training',simanagement.get_training)
  .delete('/training/:id',simanagement.delete_training)

  .post('/banner',simanagement.createBanner)
  .get('/banner',simanagement.get_banner)
  .delete('/banner/:id',simanagement.delete_banner)

  .post('/news',simanagement.createNews)
  .get('/news',simanagement.get_news)
  .delete('/news/:id',simanagement.delete_news)

module.exports = Route;
