const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
})

module.exports = Event