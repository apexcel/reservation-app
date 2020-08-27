const mongoose = require('mongoose');

const kakaoToken = new mongoose.Schema({
    access_token: { type: String },
    refresh_token: { type: String },
    expires_in: { type: String },
    refresh_token_expires_in: { type: String },
})

module.exports = mongoose.model('kakaoAccessToken', kakaoToken);