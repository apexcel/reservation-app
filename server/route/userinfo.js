const express = require('express')
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/schema/user')
const Lesson = require('../database/mongo/schema/lesson')

function stringFromDate(date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

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

router.get('/setuser/:name', async (req, resp) => {
    mongoConn.conn();

    const query = {
        fullname: req.params.name,
    };

    const filterQuery = {
        lessons: {
            $elemMatch: {
                counter: { $gt: 0 },
                start: { $lte: stringFromDate(new Date()) },
                end: { $gte: stringFromDate(new Date()) }
            }
        }
    }

    const updateQuery = {
        lessons: {
            $elemMatch: {
                counter: { $gt: 0 },
                start: { $lte: stringFromDate(new Date()) },
                end: { $gte: stringFromDate(new Date()) }
            }
        },
        $inc: {
            'lessons.$.counter': -1
        }
    }

    const options = {
        upsert: true,
        new: true,
        //select: filterQuery
    };

    await User.findOneAndUpdate(query, updateQuery, options, (err, res) => {
        if (err) throw err;
        console.log(res)
    })

    resp.sendStatus(201)
    mongoConn.disconn()
})

router.post('/lesson-update', async (req, resp) => {
    if (req.body.lesson.lessonName === '') {
        resp.sendStatus(200);
    }
    else {
        mongoConn.conn();
        const searchQuery = {
            fullname: req.body.fullname
        };

        const updateQuery = {
            $inc: { 'point': req.body.lesson.point },
            $push: {
                'lessons': {
                    'name': req.body.lesson.lessonName,
                    'counter': req.body.lesson.counter,
                    'enrollDate': req.body.lesson.enrollDate,
                    'startDate': req.body.lesson.startDate,
                    'endDate': req.body.lesson.endDate,
                    'discount': req.body.lesson.discount,
                    'additionalDays': req.body.lesson.additionalDays,
                    'price': req.body.lesson.price
                }
            }
        };

        const options = {
            upsert: true,
            new: true,
        };

        // 두 번씩 호출 되는 이유
        // 앞에 await 때문, 따라서 callback으로 내부에서 나머지를 호출해야함
        User.findOneAndUpdate(searchQuery, updateQuery, options, (err, res) => {
            if (err) throw err;
            resp.sendStatus(201);
            mongoConn.disconn()
        });
    }
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