const express = require('express')
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/user')

router.post('/sign-in', (req, resp) => {
    const query = 'SELECT * FROM users WHERE id=BINARY(?) AND pw=BINARY(?)'
    const query_data = [req.body.user.id, req.body.user.pw]

    const connection = mysqlConn.init();
    mysqlConn.conn(connection)
    connection.query(query, query_data, (err, row) => {
        if (err) throw err
        if (!row.length > 0) resp.send({ auth: false })
        
        // check
        let check_list;
        for (const key in row) {
            check_list = Object.values(row[key])
            if ((!check_list.filter(el => el.length > 0).length > 0) || check_list === null || check_list === undefined || check_list === '') {
                resp.send({ auth: false, })
            }
            else {
                resp.send({
                    result: row,
                    auth: true,
                    stamp: new Date().getTime(),
                })
            }
        }
    })
    connection.end()
});

router.post('/sign-up', (req, resp) => {
    let query = 'INSERT INTO users VALUES(?, ?, ?, ?, ?)'
    let query_data = [
        req.body.id,
        req.body.pw,
        (req.body.last_name + req.body.first_name),
        req.body.dob.replace(/-/g, ''),
        req.body.tel]

    if (query_data.filter(el => (el !== '' && el !== null && el !== undefined)).length < 5) {
        resp.status(400);
        return;
    }

    const connection = mysqlConn.init();
    mysqlConn.conn(connection)
    connection.query(query, query_data, (err, row) => {
        if (err) throw err
        resp.send(row)
    })
    connection.end()
});


router.get('/sign-in2', async (req, resp) => {
    mongoConn.conn();
    mongoConn.disconn();
});


module.exports = router;