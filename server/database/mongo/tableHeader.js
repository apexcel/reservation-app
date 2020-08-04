const mongoose = require('mongoose');

const column = new mongoose.Schema({
    name: { type: String, required: true },
    field: { type: String, required: true },
    range: { type: [] },
});

const tableHeader = new mongoose.Schema({
    header: [column],
    dow: { type: Number, required: true },
});

module.exports = mongoose.model('TableHeader', tableHeader);