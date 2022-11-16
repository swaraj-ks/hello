'use strict';

const express = require('express');
const Teachers = require('../controller/Teachers');
const Route = express.Router();

Route
  .post('/',Teachers.teacher_reg)
  .post('/login',Teachers.login)
  .post('/apply_job',Teachers.applying_job)
  .post('/update/:id/:option',Teachers.update_details)
  .post('/edit/:id/:option/:key/:selection',Teachers.edit_details)
  .delete('/delete/:id/:option',Teachers.update_details)
  .get('/dashboard/:id',Teachers.dashboard_details)
  .get('/list',Teachers.teacharList)
  .post('/edit/:_id',Teachers.edit_teacher)
  .delete('/:id',Teachers.deleteTeacher)
  .get('/Job_list',Teachers.Job_list)
  .post('/profile',Teachers.upload_profile__tr)
  .get('/search/:name',Teachers.search)
  .get('/certificate_verification/:certificate_id',Teachers.certificate_verificatino)
  .get('/getbyinstitution/:institution_id',Teachers.get_techer_by_institution)

module.exports = Route;
