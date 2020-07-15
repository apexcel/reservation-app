const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
const db = require('./db')

router.use(cors())
router.use(bodyParser.json())

router.post('/login_check', (req, res) => {
    const sign_in = req.body.data
    const dbconn = db.init()
    console.log(sign_in)
    console.log(typeof sign_in.stamp)
    const query = 'SELECT * FROM users WHERE id=? AND pw=?'
    const query_data = [sign_in.id, sign_in.pw]
    db.conn(dbconn)
    dbconn.query(query, query_data, (err, row) => {
        res.send({result: row, logged: true})
    })
    dbconn.end()
})

router.post('/signup', (req, res) => {
    let sign_up = req.body
    const dbconn = db.init()
    db.conn(dbconn)
    console.log(sign_up)

    let query = 'INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)'
    let query_data = [
        sign_up.id, 
        sign_up.pw, 
        (sign_up.last_name + sign_up.first_name), 
        sign_up.dob.replace(/-/g, ''),
        sign_up.tel,
        sign_up.email]
    console.log(query_data)
    dbconn.query(query, query_data, (err, result) => {
        if (err) throw err
        res.send(result)
    })
    dbconn.end()
})

module.exports = router;