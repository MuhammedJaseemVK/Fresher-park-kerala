const { default: mongoose } = require('mongoose');
const { scrapJobsService, scrapTechnoparkJobs, filterTrainingCompanies } = require('../service/scrapperService');
const puppeteer = require('puppeteer');
const jobModel = require('../models/jobModel');

const scrapJobsController = async () => {
    try {
        const executablePath = puppeteer.executablePath();
        console.log('Using Chrome executable:', executablePath);
      
        const browser = await puppeteer.launch({
          executablePath,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const infoparkJobSelector = { jobElement: '.joblist', companyName: '.jobs-comp-name a', jobTitle: '.mt5 a', jobLink: '.joblist .mt5 a', jobDeadline: '.job-date', techparkName: 'Infopark' };
        const cyberparkJobSelector = { jobElement: '.job_listing', companyName: '.company strong', jobTitle: '.position h3', jobLink: '.job_listing a', jobDeadline: 'unknown', techparkName: 'Cyberpark' };

        const technoparkJobsPromise = scrapTechnoparkJobs();
        const infoparkJobsPromise = scrapJobsService(browser, 'https://infopark.in/ml/companies/job-search', infoparkJobSelector);
        const cyberparkJobsPromise = scrapJobsService(browser, 'https://www.cyberparkkerala.org/careers/#', cyberparkJobSelector);

        const [technoparkJobs, infoparkJobs, cyberparkJobs] = await Promise.all([technoparkJobsPromise, infoparkJobsPromise, cyberparkJobsPromise])

        const fresherJobs = [...technoparkJobs, ...infoparkJobs, ...cyberparkJobs];
        const filteredJobs = filterTrainingCompanies(fresherJobs);

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await jobModel.deleteMany({}, session);
            await jobModel.insertMany(filteredJobs, session);

            await session.commitTransaction();
            session.endSession();
            console.log('Job collection replaced successfully');
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log('Error replacing job collection:', error);
        }
        console.log('all jobs from all parks sent');
    }
    catch (error) {
        console.log(error);
        console.log('Error in fetching jobs');
    }
}


const getJobsController = async (req, res) => {
    try {
        const fresherJobs = await jobModel.find({});
        const formattedFresherJobs = fresherJobs.map((fresherJob) => {
            const { companyName, title, jobLink, jobDeadline, techparkName } = fresherJob;
            return { companyName, title, jobLink, jobDeadline, techparkName }
        })
        console.log('all jobs from all parks sent');
        return res.status(200).send(formattedFresherJobs);
    }
    catch (error) {
        console.log("Error in fetching jobs from Database");
        return res.status(500).send("Internal server error");
    }
}

module.exports = { scrapJobsController, getJobsController };
