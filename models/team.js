const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userEmails: [{
        type: String
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Team', teamSchema)