const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../database/mongo/user')
const TableHeader = require('../database/mongo/tableHeader')
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const { json } = require('body-parser');

router.post('/sign-in', (req, res) => {
    const query = 'SELECT * FROM users WHERE id=BINARY(?) AND pw=BINARY(?)'
    const query_data = [req.body.user.id, req.body.user.pw]

    const connection = mysqlConn.init();
    mysqlConn.conn(connection)
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

router.post('/sign-up', (req, res) => {
    let query = 'INSERT INTO users VALUES(?, ?, ?, ?, ?)'
    let query_data = [
        req.body.id,
        req.body.pw,
        (req.body.last_name + req.body.first_name),
        req.body.dob.replace(/-/g, ''),
        req.body.tel]
    console.log(query_data)

    if (query_data.filter(el => (el !== '' && el !== null && el !== undefined)).length < 5) {
        res.status(400);
        return;
    }

    const connection = mysqlConn.init();
    mysqlConn.conn(connection)
    connection.query(query, query_data, (err, row) => {
        if (err) throw err
        res.send(row)
    })
    connection.end()
});

router.get('/test', async (req, res) => {
    mongoConn.conn();
    mongoose.connection;
    console.log("called1");
    let obj = await TableHeader.find({}, (err, res) => {
        if (err) throw err;
    });

    console.log(obj[0])

    //console.log("Log", a);
    mongoConn.disconn();
    res.send(obj)
})

module.exports = router;