const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String },
    counter: { type: Number },
    start: { type: String },
    end: { type: String },
    price: { type: Number }
});

module.exports = mongoose.model('Lesson', lessonSchema);
