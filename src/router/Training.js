
'use strict';

const express = require('express');
const Training = require('../controller/Training');
const Route = express.Router();

Route
  .post('/training_center',Training.add_training_center)
  .get('/training_center',Training.get_training_center)
  .post('/training_programme',Training.add_training_programme)
  .post('/training_programme/:edit_id',Training.edit_training_programme)

  .get('/training_programme',Training.get_training_programme)
  .get('/search_center/:name',Training.search_traning_center)
  .get('/search_institute/:instituteName',Training.search_institute)
  .get('/get_programme_center/:center_id',Training.programme_based_center)
  .post('/add_enrolment/:option',Training.add_enrolment)
  .get('/get_enrolment/:programme_id',Training.get_enrolment)
  .get('/get_teacher/:teacher_id',Training.get_teacher_enrolled)
  .get('/get_institute/:institute_id',Training.get_institute_enrolled)
  .get('/get_programme/:programme_id',Training.get_endrolmentByprogramme)
  .delete('/centers/:id',Training.delete_center)
  .delete('/programme/:id',Training.delete_prgramme)




module.exports = Route;
