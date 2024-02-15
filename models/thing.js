const mongoose = require('mongoose')

const thingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    coverImage: {
        type: Buffer
    },
    coverImageType: {
        type: String
    },
    size: {
        type: Number
    },
    statement: {
        type: String
    },
    feel: {
        type: String
    },
    see: {
        type: String
    }, 
    do: {
        type: String
    },
    hear: {
        type: String
    },
    pain: {
        type: String
    },
    gain: {
        type: String
    },
    who: {
        type: String
    },
    what: {
        type: String
    }, 
    how: {
        type: String
    },
    ideas: [{
        type: String
    }],
    data: {
        type: String
    },
    metric: {
        type: String
    }, 
    goal: {
        type: String
    },
    creationType: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    link: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

thingSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})


module.exports = mongoose.model('Thing', thingSchema)