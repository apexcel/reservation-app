const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    counter: { type: Number, min: 0, required: true },
    enrollDate: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    price: { type: Number, min: 0, required: true },
    discount: { type: Number },
    additionalDays: { type: Number, min: 0 }
});

module.exports = mongoose.model('Lesson', lessonSchema);
