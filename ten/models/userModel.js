const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/testapp');

const userSchema = mongoose.Schema({
    username: {
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
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
