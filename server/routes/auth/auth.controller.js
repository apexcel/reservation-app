const CryptoJS = require('crypto-js');
const mongoConn = require('../../database/mongo/mongoConn');
const User = require('../../database/mongo/schema/user');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const TOKEN_KEY = process.env.TOKEN_KEY;
const SHA256_KEY = process.env.REACT_APP_SHA256_KEY;
const AES_KEY = process.env.REACT_APP_AES_KEY;

const isValidUser = async (signInForm) => {
    try {
        mongoConn.conn();
        const user = await User.findOne(signInForm);
        mongoConn.disconn();
        if (user) {
            return {
                username: user.username,
                id: user.id
            }
        }
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

const encryptAES = (data, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

const decryptAES = (cipher, key) => {
    const bytes = CryptoJS.AES.decrypt(cipher, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const generateJWT = (payload, key) => {
    return jwt.sign(
        { payload: payload },
        key,
        { expiresIn: 1799000 });
}

exports.verifyAuth = async function (req, resp, next) {
    if (req.headers.authorization) {
        console.log('Auth:', req.headers.authorization)
        const bearer = jwtDecode(req.headers.authorization.split(' ')[1]);
        if (new Date().valueOf() < new Date(bearer.exp * 1000)) {
            resp.locals.user = decryptAES(bearer.payload, AES_KEY)
            return next();
        }
        return resp.json({
            error: 'Token expired'
        });
    }
    else {
        console.log('No authorization header')
        console.log(req.headers)
        const signInForm = decryptAES(req.body.sign_in_form, AES_KEY);
        const user = await isValidUser(signInForm);
        if (user) {
            const payload = encryptAES(user, AES_KEY)
            const token = generateJWT(payload, TOKEN_KEY)
            return resp.json({ token: token });
        }
        else {
            return resp.json({ error: 'Invalid user' });
        }
    }
}