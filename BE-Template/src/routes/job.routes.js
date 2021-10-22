var express = require('express');
var router = express.Router();

const {getProfile} = require('../middleware/getProfile');

var JobController = require('../controllers/job.controller');

router.get('/', getProfile, JobController.getJobs);
router.get('/unpaid', getProfile, JobController.getUnpaidJobs);
router.post('/:job_id(\\d+)/pay', getProfile, JobController.payForJob);

module.exports = router;
