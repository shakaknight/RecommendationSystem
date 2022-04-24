const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
    _problemId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    future: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    upload: {
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

const Solution = mongoose.model('Solution', SolutionSchema);

module.exports = { Solution }