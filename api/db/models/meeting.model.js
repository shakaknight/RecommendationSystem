const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    menteeId: {
        type: String,
        required: true
    },
    mentorId: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    submitDate: {
        type: String,
        required: true
    },
})

const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = { Meeting }