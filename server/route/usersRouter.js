const express = require('express')
const router = express.Router();
const usersController = require('./controllers/users.controller');
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/schema/user')

function stringFromDate(date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

router.post('/test', (req, resp, next) => {
    usersController.createToken(req, resp, next)
})

router.post('/signin', (req, resp, next) => {
    usersController.signInUser(req, resp, next)
});

router.post('/signup', async (req, resp, next) => {
    usersController.signUpUser(req, resp, next)
});

router.get('/getuser/:name', async (req, resp, next) => {
    console.log('param: ', req.params)
    usersController.getUserInfo(req, resp, next)
})

router.put('/update-lesson/:name', async (req, resp) => {
    mongoConn.conn();

    const query = {
        fullname: req.params.name,
        lessons: {
            $elemMatch: {
                counter: { $gt: 0 },
                startDate: { $lte: stringFromDate(new Date()) },
                endDate: { $gte: stringFromDate(new Date()) }
            }
        }
    };

    const updateQuery = {
        $inc: {
            'lessons.$.counter': -1
        }
    }

    const options = {
        upsert: true,
        new: true,
    };

    User.findOneAndUpdate(query, updateQuery, options, (err, res) => {
        if (err) {
            resp.sendStatus(500)
            //throw err;
        }
        else {
            console.log(res)
            resp.sendStatus(200)
        }
        mongoConn.disconn()
    })
})

router.put('/add-lesson', async (req, resp) => {
    if (req.body.lesson.lessonName === '') {
        resp.sendStatus(400);
    }
    else {
        mongoConn.conn();
        console.log(req.body)
        const searchQuery = {
            fullname: req.body.fullname
        };

        const updateQuery = {
            $inc: { point: req.body.lesson.point },
            $push: {
                lessons: {
                    name: req.body.lesson.lessonName,
                    counter: req.body.lesson.counter,
                    enrollDate: req.body.lesson.enrollDate,
                    startDate: req.body.lesson.startDate,
                    endDate: req.body.lesson.endDate,
                    discount: req.body.lesson.discount,
                    additionalDays: req.body.lesson.additionalDays,
                    price: req.body.lesson.price
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
            resp.sendStatus(200);
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