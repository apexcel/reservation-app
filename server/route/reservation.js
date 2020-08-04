const express = require('express');
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');

router.post("/get-booked-data", (req, resp) => {
    console.log(req.body)

    const connection = mysqlConn.init();
    mysqlConn.conn(connection)
    const query = "SELECT * FROM ??";
    const query_param = `time_table${req.body.date}`
    connection.query(query, query_param, (err, row) => {
        if (err) throw err
        console.log(row)
        resp.send(row)
    })
    connection.end()
});

router.post("/set-booked-data", (req, resp) => {
    console.log(req.body)
    
    const connection = mysqlConn.init();
    mysqlConn.conn(connection)
    const query = "UPDATE ?? SET booked_data = (?) WHERE time = ?;";
    const query_param = [
        `time_table${req.body.date}`,
        req.body.booked_data,
        req.body.time
    ];
    
    connection.query(query, query_param, (err, row) => {
        if (err) throw err
        console.log(row)
        resp.send(row)
    })
    connection.end()
});

module.exports = router;