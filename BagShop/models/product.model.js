const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    bgColor: {
        type: String,
        required: true
    },
    panelColor: {
        type: String,
        required: true
    },
    textColor: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Product', productSchema);
