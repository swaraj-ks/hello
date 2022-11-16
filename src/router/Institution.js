'use strict';

const express = require('express');
const Institution = require('../controller/Institution');
const Route = express.Router();

Route
  .post('/',Institution.institution_reg)
  .get('/list_of_institution/:option',Institution.register_institution_list)
  .get('/approvel/:email',Institution.approve_institution)
  .post('/add_exists/:institution_id',Institution.existing_faculti)

  .post('/create_job',Institution.create_Job)
  .get('/job_list/:institution_id',Institution.job_application)
  .post('/edit/:_id',Institution.edit_institution)
  .get('/recevied_application/:job_id',Institution.application_recevie)
  .get('/Job_list',Institution.Job_list)
  .get('/job_list_filter/:teacher_id',Institution.Job_list_filter)
  .post('/add_csv',Institution.add_csv)


  .get('/dashboard/:id',Institution.dashboard_details)
  .post('/:option/:institution_id/:key/:selection',Institution.edit_option)
  .delete('/:_id',Institution.delete_institution)
  .delete('/delete_job/:_id',Institution.delete_job)
  .post('/edit/:_id',Institution.edit)
  .post('/logo',Institution.upload_logo)
  .post('/profile_update',Institution.upload_logo)
  .post('/profile',Institution.upload_profile)

  .get('/search/:name',Institution.search)
  .get('/getJob/:id',Institution.get_Job)
  .get('/applicant_list',Institution.get_applicant)
  .get('/applicant_list/:job_id',Institution.get_applicant_job_id)
  
  .get('/checkMail/:email',Institution.checkMail)


  .delete('/:id/faculty/:facultyId', Institution.deleteFaculty)

  
// .get('/search/:name',Institution.search)


  



module.exports = Route;