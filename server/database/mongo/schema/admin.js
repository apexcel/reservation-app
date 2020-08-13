const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    isAdmin: { type: Boolean, required: true }
});

module.exports = mongoose.model('Admin', adminSchema);