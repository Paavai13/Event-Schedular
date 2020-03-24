const mongoose = require('mongoose')

const Group = mongoose.model('Group', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    users: {
        type: String,
        required: false
    },
    public: {
        type: Boolean,
        required: true
    }
})

module.exports = Group