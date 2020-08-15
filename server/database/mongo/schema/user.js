const mongoose = require('mongoose');
const LessonSchema = require('./lesson').schema

const reservationSchema = new mongoose.Schema({
    target: { type: String },
    date: { type: Date }
});

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    tel: { type: String, required: true },
    point: { type: Number, default: 0 },
    lessons: [LessonSchema],
    reservations: [reservationSchema],
});

module.exports = mongoose.model('User', userSchema);