const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin','user'],
        required: true
    },
    storageUsed: {
        type: String
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        lowercase: true,
        trim: true,
        unique: [true,'Email already exists'],
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minlength: [3, 'Password is too short']
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',userSchema)