const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const getConn = require('../database/mysql/mysqlConn');


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

router.get('/find', async (req, resp) => {

    // function save(rs) {
    //     getConn(async (conn) => {
    //         console.log(rs)
    //         console.log(rs[0])
    //         const query = 'SELECT * FROM ?? WHERE booked_data LIKE ?';
    //         const query_param = [rs[24], '%신상현%']
    //         return conn.query(query, query_param, (err, res) => {
    //             if (err) throw err;
    //             console.log(res)
    //         })
    //     })
    // }

    await getConn(async (conn) => {
        const query = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME=?';
        const query_param = 'booked_data'

        await conn.query(query, query_param, (err, res) => {
            if (err) throw err;
            const vals = res.map((el, idx) => el['TABLE_NAME']);

            const query = 'SELECT * FROM ?? WHERE booked_data LIKE ?';
            const query_param = [vals[24], '%신상현%']
            return conn.query(query, query_param, (err, res) => {
                if (err) throw err;
                console.log(res)
            })

            save(vals);
        })

        conn.release();
    })

    // connection.query(query, query_param, async (err, res, fields) => {
    //     if (err) throw err;
    //     return await res.map((el, idx) => {
    //         el['TABLE_NAME']
    //     })
    // })

    //connection.end();
    resp.send('end')
})



module.exports = router;