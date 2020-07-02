const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json('index')
})

router.get('/user', (req, res, next) => {
    res.json([
        {id: 1, name: 'kim'},
        {id: 2, name: 'jane'}
    ])
})

module.exports = router;