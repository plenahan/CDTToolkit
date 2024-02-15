const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    reflection: {
        type: String,
        default: 'false'
    }
})

module.exports = mongoose.model('Project', projectSchema)