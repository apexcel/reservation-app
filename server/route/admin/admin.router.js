const express = require('express')
const router = express.Router();
const adminController = require('./admin.controller')

router.post('/signin', (req, resp, next) => {
    adminController.createToken(req, resp, next)
});

router.post('/signup', (req, resp, next) => {
    adminController.signUpAdmin(req, resp, next)
});

router.get('/adminlist', (req, resp, next1) => {
    adminController.getAdminList(req, resp, next);
})

router.post('/kakao-token', (req, resp, next) => {
    adminController.kakaoAuthToken(req, resp, next)
})

module.exports = router;