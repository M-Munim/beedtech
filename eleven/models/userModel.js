const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/testapp');

const user = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    posts:
        [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }]
});

module.exports = mongoose.model('User', user);