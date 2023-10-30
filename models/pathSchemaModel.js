const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    },
    parentPath: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Path', pathSchema)