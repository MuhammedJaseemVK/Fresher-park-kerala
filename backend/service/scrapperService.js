const axios = require('axios');

const scrapJobsService = async (browser, url, jobSelector) => {
    try {
        const page = await browser.newPage();

        // Block unnecessary resources
        await page.setRequestInterception(true);
        await page.on('request', (req) => {
            const resourceType = req.resourceType();
            if (resourceType === 'document' || resourceType === "script") {
                req.continue();
            }
            else {
                req.abort();
            }
        });

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        const fresherJobs = await page.evaluate((jobSelector) => {
            const isAFresherJob = (title) => {
                const jobTitle = title.toLowerCase();
                const pattern = /\bintern(ship)?\b/;
                if (jobTitle.includes('fresher') || jobTitle.includes('0-') || pattern.test(jobTitle) || jobTitle.includes('apprentice') || jobTitle.includes('trainee') || jobTitle.includes('graduate')) {
                    return true;
                }
                else {
                    return false;
                }
            }

            const getDeadlineDate = (date) => {
                const deadlineDate = new Date(date);
                return deadlineDate.toLocaleDateString('en-IN');
            }

            const jobs = [];
            const jobElements = document.querySelectorAll(jobSelector.jobElement);
            jobElements.forEach((job) => {
                const jobTitle = job.querySelector(jobSelector.jobTitle).innerText;
                const jobDeadline = job.querySelector(jobSelector.jobDeadline);

                if (isAFresherJob(jobTitle)) {
                    jobs.push({
                        companyName: job.querySelector(jobSelector.companyName).innerText,
                        title: jobTitle,
                        jobLink: job.querySelector(jobSelector.jobLink).href,
                        jobDeadline: jobDeadline ? getDeadlineDate(jobDeadline.innerText) : "unknown",
                        techparkName: jobSelector.techparkName
                    })
                }
            });
            return jobs;
        }, jobSelector);
        console.log(fresherJobs.length);
        await page.close();

        console.log(`${jobSelector.techparkName} response sent`);
        return fresherJobs;
    }
    catch (err) {
        console.log(`Some error occured in scrapping jobs from:${url}`);
        console.log(err);
        return []
    }
}
const isAFresherJob = (title) => {
    const jobTitle = title.toLowerCase();
    const pattern = /\bintern(ship)?\b/;
    if (jobTitle.includes('fresher') || jobTitle.includes('0-') || pattern.test(jobTitle) || jobTitle.includes('apprentice') || jobTitle.includes('trainee') || jobTitle.includes('graduate')) {
        return true;
    }
    else {
        return false;
    }
}

const getDeadlineDate = (date) => {
    const deadlineDate = new Date(date);
    return deadlineDate.toLocaleDateString('en-IN');
}

const filterTrainingCompanies = (jobList) => {
    const trainingCompaniesRegex = /(galtech|altos|idatalytics|mashuptech)/i;
    return jobList.filter((job) => !trainingCompaniesRegex.test(job.companyName));
}

const scrapTechnoparkJobs = async () => {
    try {
        const firstPageData = await axios.get('https://technopark.org/api/paginated-jobs?page=1&search=&type=');
        const firstPageJobsData = firstPageData.data.data;
        const lastPageNumber = firstPageData.data.last_page;

        const remainingPageJobsRequests = [];

        for (let currentPageNumber = 2; currentPageNumber <= lastPageNumber; currentPageNumber++) {
            remainingPageJobsRequests.push(axios.get(`https://technopark.org/api/paginated-jobs?page=${currentPageNumber}&search=&type=`))
        }

        const remainingPageJobsData = await Promise.all(remainingPageJobsRequests);
        const allJobsData = [...firstPageJobsData, ...remainingPageJobsData.map((jobDataPerPage) => jobDataPerPage.data.data).flat()];
        const fresherJobs = allJobsData.filter((job) => isAFresherJob(job.job_title));
        const transfomedFresherJobs = fresherJobs.map((job) => ({
            companyName: job.company.company,
            title: job.job_title,
            jobLink: `https://technopark.org/job-details/${job.id}`,
            jobDeadline: job.closing_date ? getDeadlineDate(job.closing_date) : "unknown",
            techparkName: "Technopark"
        }));
        return transfomedFresherJobs;
    }
    catch (error) {
        console.log("error in scraping technopark jobs");
        console.log(error);
        return [];
    }
}


module.exports = { scrapJobsService, scrapTechnoparkJobs, filterTrainingCompanies }