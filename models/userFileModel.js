const mongoose = require('mongoose')

const userFileSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        enum: ['public','private','shared'],
        required: true
    },
    shared:{
        type: Array,
        default: []
    },
    version:{
        type: String
    },
    isCurrentVersion:{
        type: Boolean
    },
    metadata: {
        type: Object
    },
    diskFileName:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserFile',userFileSchema)