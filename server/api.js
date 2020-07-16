const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
const db = require('./db')

router.use(cors())
router.use(bodyParser.json())

// Sign In Check
router.post('/login_check', (req, res) => {
    const sign_in = req.body
    const query = 'SELECT * FROM users WHERE id=? AND pw=?'
    const query_data = [sign_in.user.id, sign_in.user.pw]
    const dbconn = db.init()
    db.conn(dbconn)
    dbconn.query(query, query_data, (err, row) => {
        if (err) throw err
        if (!row.length > 0) res.send({ auth: false })
        // check
        let check_list;
        for (const key in row) {
            check_list = Object.values(row[key])
            if ((!check_list.filter(el => el.length > 0).length > 0) || check_list === null || check_list === undefined || check_list === '') {
                res.send({ auth: false, })
            }
            else {
                res.send({
                    result: row,
                    auth: true,
                    stamp: new Date().getTime()
                })
            }
        }
    })
    dbconn.end()
})

router.post('/signup', (req, res) => {
    let sign_up = req.body
    let query = 'INSERT INTO users VALUES(?, ?, ?, ?, ?)'
    let query_data = [
        sign_up.id,
        sign_up.pw,
        (sign_up.last_name + sign_up.first_name),
        sign_up.dob.replace(/-/g, ''),
        sign_up.tel]
    console.log(query_data)
    const dbconn = db.init()
    db.conn(dbconn)
    dbconn.query(query, query_data, (err, result) => {
        if (err) throw err
        res.send(result)
    })
    dbconn.end()
})

module.exports = router;