const mongoose = require('mongoose')

const empathyMapSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
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
empathyMapSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('EmpathyMap', empathyMapSchema)