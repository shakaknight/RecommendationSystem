const mongoose = require('mongoose');

const WprSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    target: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    achievement: {
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
    link: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    submitDate: {
        type: String,
        required: true
    },
    reviewDate: {
        type: String,
        required: false,
        default: ''
    },
    remarks: {
        type: String,
        required: false,
        default: ''
    }
})

const Wpr = mongoose.model('Wpr', WprSchema);

module.exports = { Wpr }