'use strict';

const express = require('express');
const job = require('../controller/Job');
const Route = express.Router();

Route
  .post('/apply',job.suggest_job)
  .get('/getApplicantList/:job_id',job.applicantList)
  .post('/select',job.selectCandidate)
  .get('/status/:id',job.reponse_status)
  .get('/getAppliedJob/:id',job.appliedJob)
  .get('/update_view_Status/:user_id',job.update_view_status)

module.exports = Route;

//   .patch('/account/role/:searchString/:role', AccountCtrl.role)