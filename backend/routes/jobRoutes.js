const express = require('express');
const router = express.Router();
const { getJobsController } = require('../controller/jobController');

router.get('/jobs', getJobsController);

module.exports = router;