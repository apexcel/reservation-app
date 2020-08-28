const Admin = require('../../database/mongo/schema/admin');
const KakaoMsg = require('../../database/mongo/schema/kakaomsg');
const KakaoToken = require('../../database/mongo/schema/kakaotoken');
const mongoConn = require('../../database/mongo/mongoConn');
const jwt = require('jsonwebtoken');
const axios = require('axios')
const querystring = require('querystring')

// TODO: 키 따로 관리하기
const SECRET_KEY = 'secret_key_0815';
const KAKAO_REST_API_KEY = '52d0e38dadbfb480d5daa3566df71c2f';

exports.kakaoAuthToken = async function (req, resp, next) {
    try {
        const host = 'https://kauth.kakao.com';
        const path = '/oauth/token';
        const redirectUri = 'http://localhost:3001/admin/kakao-api';
        const data = {
            'grant_type': 'authorization_code',
            'client_id': KAKAO_REST_API_KEY,
            'redirect_uri': redirectUri,
            'code': req.body.code
        };
        const result = await axios.post(`${host}${path}`, querystring.stringify(data))
        resp.status(200).json(result.data)
        mongoConn.conn()
        await KakaoToken.deleteMany({}, (err, res) => {
            console.log('Delete all KakaoToken document')
        })
        await new KakaoToken(result.data).save();
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.kakaoBookMessage = async function (req, resp, next) {
    console.log(req.body)
    try {
        mongoConn.conn()
        for (let i = 0; i < req.body.length; i += 1) {
            
            const options = {
                upsert: true,
                new: true,
                setDefaultOnInsert: true
            };
            
            const msg = {
                profile_nickname: req.body[i].nickname,
                app_uuid: req.body[i].uuid,
                date: req.body[i].date,
                time: req.body[i].time,
                message: req.body[i].message,
            }

            await new KakaoMsg(msg).save(options)
        }
        resp.status(200).json({
            result: true,
            desc: 'Kakao message reservation succeed'
        })
        
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.kakaoRefreshAccessToken = async function (req, resp, next) {
    try {
        mongoConn.conn()
        const tokenData = await KakaoToken.findOne({});
        console.log(tokenData)
        const configs = {
            grant_type: 'refresh_token',
            client_id: KAKAO_REST_API_KEY,
            refresh_token: tokenData.refresh_token,
        };

        const res = await axios.post('https://kauth.kakao.com/oauth/token', querystring.stringify(configs))
        console.log(res)
        await KakaoToken.findOneAndUpdate({}, {access_token: res.data.access_token})

        //TODO: 클라이언트에서 갱신하기
        resp.status(200).json({
            result: true,
            access_token: res.data.access_token,
            token_type: res.data.token_type,
            expires_in: res.data.expires_in,
            desc: 'Kakao new access token requested'
        })
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.kakaoCheckToken = async function (req, resp, next) {
    const headers = {
        'Authorization': `Bearer ${req.body.token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    };

    const res = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', { headers: headers })
    console.log(res)
    resp.json({ 
        result: true,
        desc: 'Kakao user access token checked.'
    })
}

exports.createToken = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const query = {
            username: req.body.username,
            password: req.body.password,
        };
        const admin = await Admin.findOne(query);

        if (admin) {
            const token = jwt.sign(
                {
                    username: admin.username,
                    fullname: admin.fullname,
                    isAdmin: admin.isAdmin
                },
                SECRET_KEY,
                { expiresIn: '30m' }
            );

            resp.status(201).json({
                result: true,
                desc: 'Token created',
                token
            });
        }
        else {
            resp.status(400).json({ error: 'Invalid admin' })
        }
        mongoConn.disconn();
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.signUpAdmin = async function (req, resp, next) {
    try {
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
        resp.status(201).json({
            result: true,
            desc: 'Admin registered'
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}


exports.getAdminList = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const list = await Admin.find({})
        const adminNames = list.map(el => el.fullname);
        resp.status(200).json({
            result: true,
            desc: 'Admin name list',
            adminNames
        });
        mongoConn.disconn();
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}