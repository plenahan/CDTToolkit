const mongoose = require('mongoose')
// const Template = require('../template')

const noteSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    stage: {
        type: String,
        enum: [
            'empathize', 
            'define', 
            'ideate', 
            'prototype', 
            'test',
            'general',
            ''
        ]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    // status: {
    //     type: String,
    //     default: 'private'
    // },
    connectedObject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Note', noteSchema)