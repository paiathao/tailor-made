const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, default: 'User' },
});

module.exports = mongoose.model('Person', PersonSchema);
