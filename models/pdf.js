const mongoose = require('mongoose')

const pdfSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    }
    // contentType: {
    //     type: String
    // },
    // buffer: {
    //     type: Buffer
    // }
});

module.exports = mongoose.model('PDF', pdfSchema)