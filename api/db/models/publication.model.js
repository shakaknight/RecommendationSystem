const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
    title: {
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
    }
})

const Publication = mongoose.model('Publication', PublicationSchema);

module.exports = { Publication }