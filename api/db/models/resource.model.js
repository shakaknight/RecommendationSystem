const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    pages: {
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

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = { Resource }