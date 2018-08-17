const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const CustomerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    orderNumber: { type: String, required: true },
    orderDetails: { type: [], required: true },
    totalCost: { type: String, required: true },
    dropDate: { type: Date, required: true },
    pickUp: { type: String, required: true },
    paid: { type: Boolean, required: true },
    complete: { type: Boolean, required: true },
});

module.exports = mongoose.model('Customer', CustomerSchema);