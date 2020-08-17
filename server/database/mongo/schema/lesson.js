const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String },
    counter: { type: Number, min: 0 },
    start: { type: String },
    end: { type: String },
    price: { type: Number, min: 0 }
});

module.exports = mongoose.model('Lesson', lessonSchema);
