const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bagApp');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);