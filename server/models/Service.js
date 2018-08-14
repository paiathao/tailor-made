const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const ServiceSchema = new Schema({
    category: { type: String, required: true },
    service: { type: String, required: true },
    cost: { type: Number, required: true },
});

module.exports = mongoose.model('Service', ServiceSchema);