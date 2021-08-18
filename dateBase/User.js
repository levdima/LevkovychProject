const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    photo: {
        type: String,

    }

}, { timestamps: true });
module.exports = model('User', userSchema);