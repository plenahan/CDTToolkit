const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    data: {
        type: String
    },
    metric: {
        type: String
    }, 
    goal: {
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
    }
})
testSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Test', testSchema)