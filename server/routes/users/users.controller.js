const User = require('../../database/schema/user');
const mongoConn = require('../../database/mongoConn');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const querystring = require('querystring');

const TOKEN_KEY = process.env.TOKEN_KEY;
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;

function formattedDateString(date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

function generateJWT(payload) {
    return jwt.sign(
        payload,
        TOKEN_KEY,
        { expiresIn: '30m' }
    );
}

exports.kakaoAuthToken = async function (req, resp, next) {
    try {
        const host = 'https://kauth.kakao.com';
        const path = '/oauth/token';
        const redirectUri = 'http://localhost:3001/kakao-devapp';
        const data = {
            'grant_type': 'authorization_code',
            'client_id': KAKAO_REST_API_KEY,
            'redirect_uri': redirectUri,
            'code': req.body.code
        };
        const result = await axios.post(`${host}${path}`, querystring.stringify(data))
        //console.log(result)
        resp.json(result.data)
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.signUpUser = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const updateQuery = {
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            dob: req.body.dob,
            tel: req.body.tel,
            isAdmin: req.body.is_admin
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
            resp.status(201).json({
                result: true,
                desc: 'User registered'
            });
            mongoConn.disconn();
        })
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.getUserInfo = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const user = await User.findById(resp.locals.user.id)
        mongoConn.disconn()

        if (user !== null) {
            const { username, fullname, dob, tel, lessons, reservations, isAdmin } = user;
            const userInfo = {
                username: username,
                fullname: fullname,
                dob: dob,
                tel: tel,
                lessons: lessons,
                reservations: reservations,
                isAdmin: isAdmin
            };
            return resp.json({ token: generateJWT(userInfo) });
        }
        return resp.status(503).json({ error: 'Invalid user' })
    }
    catch (err) {
        console.error(err);
        return next(err)
    }
}

exports.getAllUserInfo = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const result = await User.find({}, (err, res) => {
            if (err) throw err;
        })
        resp.status(200).json(result);
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.findUser = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const user = await User.findOne({ fullname: req.params.fullname });
        mongoConn.disconn()

        if (user !== null) {
            const { username, fullname, dob, tel, lessons, reservations, isAdmin } = user;
            const userInfo = {
                username: username,
                fullname: fullname,
                dob: dob,
                tel: tel,
                lessons: lessons,
                reservations: reservations,
                isAdmin: isAdmin
            };
            return resp.json({ token: generateJWT(userInfo) });
        }
        return resp.status(503).json({ error: 'Invalid user' })
    }
    catch (err) {
        console.error(err);
        return next(err)
    }
}

exports.enrollLesson = async function (req, resp, next) {
    if (req.body.lesson.lessonName === '') {
        resp.status(400).json({ error: 'Empty lesson' });
        return;
    }
    else {
        try {
            mongoConn.conn();
            const searchQuery = { fullname: req.body.fullname };

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
                resp.status(200).json({
                    result: true,
                    desc: 'Add lesson'
                });
                mongoConn.disconn()
            });
        }
        catch (err) {
            console.error(err);
            next(err);
        }
        return;
    }
}

exports.getAdminList = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const list = await User.find({ isAdmin: true })
        const adminNames = list.map(el => el.fullname);
        resp.status(200).json({ adminNames });
        mongoConn.disconn();
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.alterLesson = async function (req, resp, next) {
    try {
        mongoConn.conn();

        const query = {
            fullname: req.params.name,
            lessons: {
                $elemMatch: {
                    counter: { $gt: 0 },
                    startDate: { $lte: formattedDateString(new Date()) },
                    endDate: { $gte: formattedDateString(new Date()) }
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
                resp.status(500).json({ error: 'Error occured' })
                //throw err;
            }
            else {
                resp.status(200).json({
                    result: true,
                    desc: 'Subtract lesson counter'
                })
            }
            mongoConn.disconn()
        })
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}