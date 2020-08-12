const express = require('express')
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/schema/user')

router.post('/sign-in', async (req, resp) => {
    mongoConn.conn()
    const query = {
        username: req.body.username,
        password: req.body.password,
    };

    const matchUser = await User.findOne(query, (err, res) => {
        if (err) throw err;
    });

    if (matchUser !== null) {
        console.log(matchUser)
        //TODO: matchUser isAdmin 으로 변경
        //const isAdmin = (matchUser.username === 'admin' && matchUser.fullname === 'admin') ? true : false;
        resp.send({
            username: matchUser.username,
            fullname: matchUser.fullname,
            dob: matchUser.dob,
            lessons: matchUser.lessons,
            reservations: matchUser.reservations,
            stamp: new Date().getTime(),
            isAdmin: matchUser.isAdmin,
        })
    }
    mongoConn.disconn()
});

router.post('/sign-up', async (req, resp) => {
    console.log(req.body)
    mongoConn.conn();
    const userInfo = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password,
        dob: req.body.dob,
        tel: req.body.tel,
        isAdmin: req.body.isAdmin
    };

    const query = {
        username: req.body.username,
        fullname: req.body.fullname,
        tel: req.body.tel
    };

    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true
    };
    // TODO: 해당 날짜 가져와서 booked lessons 확인
    // 카운터 차감

    await User.findOneAndUpdate(query, userInfo, options, (err, res) => {
        if (err) throw err;
    })
    mongoConn.disconn();
    resp.status(200);
});

router.get('/:name', async (req, resp) => {
    console.log('param: ', req.params)
    mongoConn.conn();
    const result = await User.findOne({ 'username': req.params.name })
    if (result !== null) {
        const response = {
            username: result.username,
            fullname: result.fullname,
            password: result.password,
            dob: result.dob,
            tel: result.tel,
            lessons: result.lessons,
            reservations: result.reservations
        }
        console.log(response)
        resp.send(response)
    }
    else {
        resp.status(500).end('Server Error');
    }
    mongoConn.disconn()
})

module.exports = router;