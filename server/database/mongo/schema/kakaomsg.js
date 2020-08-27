const mongoose = require('mongoose');

const kakaoMessage = new mongoose.Schema({
    profile_nickname: {type: String, required: true},
    app_uuid: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    message: {type: String}
})

module.exports = mongoose.model('KakaoMessage', kakaoMessage);