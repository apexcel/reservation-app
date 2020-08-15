const express = require('express')
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/schema/user')

router.post('/signin', async (req, resp) => {
    console.log(req.body)
    mongoConn.conn()
    const searchQuery = {
        username: req.body.username,
        password: req.body.password,
    };

    const matchUser = await User.findOne(searchQuery, (err, res) => {
        if (err) throw err;
    });

    if (matchUser !== null) {
        resp.send({
            username: matchUser.username,
            fullname: matchUser.fullname,
            dob: matchUser.dob,
            lessons: matchUser.lessons,
            reservations: matchUser.reservations,
            stamp: new Date().getTime(),
        })
    }
    else {
        resp.sendStatus(404);
    }
    mongoConn.disconn()
});

router.post('/signup', async (req, resp) => {
    console.log(req.body)
    mongoConn.conn();
    const updateQuery = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password,
        dob: req.body.dob,
        tel: req.body.tel,
    };

    const searchQuery = {
        username: req.body.username,
        fullname: req.body.fullname,
        tel: req.body.tel
    };

    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true
    };

    await User.findOneAndUpdate(searchQuery, updateQuery, options, (err, res) => {
        if (err) throw err;
    })
    mongoConn.disconn();
    resp.status(201);
});

router.get('/getuser/:name', async (req, resp) => {
    console.log('param: ', req.params)
    mongoConn.conn();
    const result = await User.findOne({ 'fullname': req.params.name });
    if (result !== null) {
        const response = {
            username: result.username,
            fullname: result.fullname,
            password: result.password,
            dob: result.dob,
            tel: result.tel,
            lessons: result.lessons,
            reservations: result.reservations
        };
        resp.send(response)
    }
    else {
        resp.status(500).end();
    }
    mongoConn.disconn()
})

router.post('/lesson-update', async (req, resp) => {
    if (req.body.lesson.lessonName === '') {
        resp.end();
        return;
    }
    mongoConn.conn();
    const searchQuery = {
        username: req.body.username
    };

    const updateQuery = {
        $inc: {'point': req.body.lesson.point},
        $push: {'lessons': {
            'name': req.body.lesson.lessonName,
            'counter': req.body.lesson.counter,
            'start': req.body.lesson.startDate ,
            'end': req.body.lesson.endDate ,
        }}
    }

    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true
    };

    const result = await User.findOneAndUpdate(searchQuery, updateQuery, options);
    console.log(result)
    mongoConn.disconn()
})

router.get('/alluser', async (req, resp) => {
    mongoConn.conn();
    const result = await User.find({}, (err, res) => {
        if (err) throw err;
    })
    resp.status(200).send(result);
    mongoConn.disconn()
})

module.exports = router;