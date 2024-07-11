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
    statementDo: {
        type: String
    },
    statementUser: {
        type: String
    },
    statementInsight: {
        type: String
    },
    feel: [{
        type: String
    }],
    see: [{
        type: String
    }], 
    do: [{
        type: String
    }],
    hear: [{
        type: String
    }],
    pain: [{
        type: String
    }],
    gain: [{
        type: String
    }],
    who: {
        type: String
    },
    what: {
        type: String
    }, 
    how: {
        type: String
    },
    type: {
        type: String,
        default: "basic"
    },
    demographic: {
        type: String
    },
    interests: [{
        type: String
    }],
    motivations: [{
        type: String
    }],
    emotions: [{
        type: String
    }],
    values: [{
        type: String
    }],
    lines: [{
        type: String
    }],
    textareas: [{
        type: String
    }],
    lines_labels: [{
        type: String
    }],
    textareas_labels: [{
        type: String
    }],
    ideas: [{
        type: String
    }],
    chart: {
        type: JSON
    },
    data: {
        type: String
    },
    construct: {
        type: String
    },
    annotations: {
        type: String
    },
    tree: {
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
    pdf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PDF'
    }
})

thingSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})


module.exports = mongoose.model('Thing', thingSchema)