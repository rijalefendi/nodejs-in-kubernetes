const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    refresh_tokens: [{
        refresh_token: String,
        registration_id: String
    }]
    
})

module.exports = mongoose.model('Users', userSchema)