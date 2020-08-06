const express = require('express')
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/user')

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
        resp.send({
            username: matchUser.username,
            fullname: matchUser.fullname,
            dob: matchUser.dob,
            lessons: matchUser.lessons,
            reservations: matchUser.reservations,
            stamp: new Date().getTime()
        })
    }
    mongoConn.disconn()
});

router.post('/sign-up', async (req, resp) => {
    console.log(req.body)
    mongoConn.conn();
    const query = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password,
        dob: req.body.dob,
        tel: req.body.tel
    };
    // TODO: 해당 날짜 가져와서 booked lessons 확인
    // 카운터 차감

    await new User(query).save();
    mongoConn.disconn();
    resp.status(200);
});

module.exports = router;