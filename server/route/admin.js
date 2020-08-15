const express = require('express')
const router = express.Router();
const mongoConn = require('../database/mongo/mongoConn');
const Admin = require('../database/mongo/schema/admin')

router.post('/signin', async (req, resp) => {
    mongoConn.conn()
    const query = {
        username: req.body.username,
        password: req.body.password,
    };

    const matchUser = await Admin.findOne(query, (err, res) => {
        if (err) throw err;
    });

    if (matchUser !== null) {
        resp.send({
            username: matchUser.username,
            fullname: matchUser.fullname,
            stamp: new Date().getTime(),
            isAdmin: matchUser.isAdmin,
        })
    }
    mongoConn.disconn()
});

router.post('/signup', async (req, resp) => {
    console.log(req.body)
    mongoConn.conn();
    const userInfo = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    };

    const query = {
        username: req.body.username,
        fullname: req.body.fullname,
    };

    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true
    };

    await Admin.findOneAndUpdate(query, userInfo, options, (err, res) => {
        if (err) throw err;
    })
    mongoConn.disconn();
    resp.status(200).end();
});

router.get('/adminlist', async (req, resp) => {
    mongoConn.conn();
    const list = await Admin.find({}, (err, res) => {
        if (err) throw err;
    });
    const adminNames = list.map(el => el.fullname);
    resp.send(adminNames);
    mongoConn.disconn();
})

router.get('/lesson-names', async (req, resp) => {

})

module.exports = router;