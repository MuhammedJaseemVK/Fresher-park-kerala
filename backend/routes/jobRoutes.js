const express = require('express');
const router = express.Router();
const { getJobsController, scrapJobsController } = require('../controller/jobController');

router.get('/getJobs', getJobsController);
router.get('/scrapJobs', scrapJobsController);

module.exports = router;