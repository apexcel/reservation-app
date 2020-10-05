const express = require('express')
const router = express.Router();
const authController = require('./auth.controller')

router.post('/sign-in', (req, resp, next) => {
    authController.provideToken(req, resp, next);
});

module.exports = router;