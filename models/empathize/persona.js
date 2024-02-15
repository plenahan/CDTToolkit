const mongoose = require('mongoose')

const personaSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
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
personaSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Persona', personaSchema)