const express = require('express')
const router = express.Router();
const adminController = require('./admin.controller')

router.post('/kakao-token', (req, resp, next) => {
    adminController.kakaoAuthToken(req, resp, next)
})

router.post('/kakao-check-token', (req, resp, next) => {
    adminController.kakaoCheckToken(req, resp, next)
})

router.get('/kakao-refresh-access-token', (req, resp, next) => {
    adminController.kakaoRefreshAccessToken(req, resp, next)
})

router.post('/kakao-book-message', (req, resp, next) => {
    adminController.kakaoBookMessage(req, resp, next)
})

module.exports = router;