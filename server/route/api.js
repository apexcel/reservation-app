const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
const db = require('../db')
const path = require('path')

router.use(cors())
router.use(bodyParser.json())


// Sign In Check
router.post('/login-check', (req, res) => {
    const sign_in = req.body
    const query = 'SELECT * FROM users WHERE id=BINARY(?) AND pw=BINARY(?)'
    const query_data = [sign_in.user.id, sign_in.user.pw]

    const connection = db.init();
    db.conn(connection)
    connection.query(query, query_data, (err, row) => {
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
                    stamp: new Date().getTime(),
                })
            }
        }
    })
    connection.end()
})

//TODO: 이미 존재하는 아이디 체크 하기
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

    if (query_data.filter(el => (el !== '' && el !== null && el !== undefined)).length < 5) {
        res.status(400);
        return;
    }

    const connection = db.init();
    db.conn(connection)
    connection.query(query, query_data, (err, row) => {
        if (err) throw err
        res.send(row)
    })
    connection.end()
});

router.post("/user-info", (req, res) => {
    console.log(req.body)
    res.send('user-info response')
})

router.post("/get-booked-data", (req, res) => {
    console.log(req.body)

    const connection = db.init();
    db.conn(connection)
    const query = "SELECT * FROM ??";
    const query_param = `time_table${req.body.date}`
    connection.query(query, query_param, (err, row) => {
        if (err) throw err
        console.log(row)
        res.send(row)
    })
    connection.end()
})

router.post("/set-booked-data", (req, res) => {
    console.log(req.body)
    
    const connection = db.init();
    db.conn(connection)
    const query = "UPDATE ?? SET booked_data = (?) WHERE time = ?;";
    const query_param = [
        `time_table${req.body.date}`,
        req.body.booked_data,
        req.body.time
    ];
    connection.query(query, query_param, (err, row) => {
        if (err) throw err
        console.log(row)
        res.send(row)
    })
    connection.end()
})

module.exports = router;