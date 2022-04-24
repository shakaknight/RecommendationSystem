const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    fields: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    submitDate: {
        type: String,
        required: true
    },
})

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = { Problem }