const User = require('../../database/mongo/schema/user');
const mongoConn = require('../../database/mongo/mongoConn');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const querystring = require('querystring');
const CryptoJS = require('crypto-js');
const sha256 = require('crypto-js/sha256');
const { response } = require('express');

//TODO: 키 따로 관리하기
const TOKEN_KEY = process.env.TOKEN_KEY;
const AES_KEY = process.env.REACT_APP_AES_SECRET_KEY;
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;

function formattedDateString(date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), AES_KEY).toString();
}

function decryptData(encryptData) {
    const bytes = CryptoJS.AES.decrypt(encryptData, AES_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// TODO: refresh token도 만들기
function createTokens(payload) {
    const accessTokenExpireTime = 7199;
    const accessToken = jwt.sign({ ...payload }, TOKEN_KEY, { expiresIn: accessTokenExpireTime * 1000 });
    return {
        accessToken: accessToken,
        accessTokenExpireTime: accessTokenExpireTime
    };
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

exports.signInUser = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const signInForm = JSON.parse(decryptData(req.body.sign_in_form));
        const user = await User.findOne(signInForm);

        if (user) {
            const userInfo = {
                username: user.username,
                fullname: user.fullname,
                dob: user.dob,
                lessons: user.lessons,
                reservations: user.reservations
            };

            const tokens = createTokens(userInfo);
            user.access_token = tokens.access_token;
            await user.save();
            mongoConn.disconn();

            const response = {
                token_type: 'Bearer',
                access_token: tokens.accessToken,
                access_token_expires_in: tokens.accessTokenExpireTime,
                refresh_token: 'Will be replaced',
                refresh_token_expires_in: 'Will be replaced'
            };
            resp.json(response);
        }
        return;
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.signUpUser = async function (req, resp, next) {
    try {
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
        const result = await User.findOne({ 'fullname': req.params.name });

        if (result !== null) {
            const token = jwt.sign(
                {
                    username: result.username,
                    fullname: result.fullname,
                    password: result.password,
                    dob: result.dob,
                    tel: result.tel,
                    lessons: result.lessons,
                    reservations: result.reservations
                },
                TOKEN_KEY,
                { expiresIn: '10m' }
            )
            resp.status(200).json({
                result: true,
                desc: 'Get user infomation',
                token
            });
        }
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err);
        next(err)
    }
    return;
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

exports.addLesson = async function (req, resp, next) {
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

exports.subtractLessonCounter = async function (req, resp, next) {
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