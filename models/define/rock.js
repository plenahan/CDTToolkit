const mongoose = require('mongoose')

const rockSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    size: {
        type: Number
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
rockSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Rock', rockSchema)