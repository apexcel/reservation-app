const express = require('express');
const router = express.Router();
const mongoConn = require('../database/mongo/mongoConn');
const TableHeader = require('../database/mongo/tableHeader')

router.get('/headers', async (req, resp) => {
    mongoConn.conn();
    let obj = await TableHeader.find({}, (err, resp) => {
        if (err) throw err;
    });
    let result = obj.map(el => el.header)
    mongoConn.disconn();
    resp.send(result)
});

module.exports = router;