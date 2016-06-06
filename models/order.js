'use strict';

var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    status: String,
    customerInfo: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        discountNumber: String,
        deliveryType: String,
        address: String
    },
    products: [{
        id: String,
        name: String,
        imageName: String,
        capacityInfo: {
            capacity: Number,
            price: Number
        },
        count: Number
    }],
    description: String
});

mongoose.model('order', Order);