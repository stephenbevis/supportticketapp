const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [
            true,
            'Please provide your first name'
        ]
    },
    lastname: {
        type: String,
        required: [
            true,
            'Please provide your last name'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'Please provide your email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [
            true,
            'Please provide a password'
        ]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)