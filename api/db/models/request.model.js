const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    mentor_email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    // mentorId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    mentee_email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    // menteeId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    //false means that mentors has not accepted till now. True shows that mentor has accepted
    status: {
        type: Boolean,
        default: false
    }
})

const Request = mongoose.model('Request', RequestSchema);

module.exports = { Request }