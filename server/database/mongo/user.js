const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: { type: String },
    counter: { type: String },
    start: { type: Date },
    end: { type: Date },
    price: {type: Number }
});

const reservationSchema = new mongoose.Schema({
    target: { type: String },
    date: { type: Date }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    lessons: [lessonSchema],
    reservations: [reservationSchema]
});

module.exports = mongoose.model('User', userSchema);