const express = require('express')
const router = express.Router();
const authController = require('./auth.controller')

router.all('/', (req, resp, next) => {
    authController.verifyAuth(req, resp, next);
});

module.exports = router;