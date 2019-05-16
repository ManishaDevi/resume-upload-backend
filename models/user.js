const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        phone_number: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        job_title: {
            type: String,
            required: true
        },
        resume: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);