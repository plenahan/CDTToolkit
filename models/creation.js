const mongoose = require('mongoose')

const creationSchema = new mongoose.Schema({
    personas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    empathymaps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    journeymaps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    statements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    abstractionladders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    rocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    lotusblossoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    brainstorms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    prototypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thing'
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

module.exports = mongoose.model('Creation', creationSchema)