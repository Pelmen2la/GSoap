'use strict';

var mongoose = require('mongoose');

var Order = new mongoose.Schema({
    status: String,
    orderIndex: Number,
    date: Number,
    customerInfo: {
        name: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        fullAddress: String,
        promocode: String,
        description: String,
        deliveryType: String
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
    }]
});

mongoose.model('order', Order);