const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    jobLink: {
        type: String,
        required: true
    },
    jobDeadline: {
        type: String,
        required: true
    },
    techparkName: {
        type: String,
        required: true
    },
}, { timestamps: true });

const jobModel = mongoose.model('jobs', jobSchema);
module.exports = jobModel;