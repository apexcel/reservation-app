const CryptoJS = require('crypto-js');
const mongoConn = require('../../database/mongoConn');
const User = require('../../database/schema/user');
const jwt = require('jsonwebtoken');

const TOKEN_KEY = process.env.TOKEN_KEY;
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

const generateJWT = (access_code, key) => {
    const expiresIn = 1799000
    return jwt.sign(
        { 
            iat: new Date().valueOf(),
            exp: new Date().valueOf() + expiresIn,
            access_code: access_code 
        }, key);
}
//TODO: 토큰 발급 방식 인증 방식 변경하기
exports.provideToken = async function (req, resp, next) {
    const signInForm = decryptAES(req.body.sign_in_form, AES_KEY);
    const user = await isValidUser(signInForm);
    if (user) {
        const access_code = encryptAES(user, AES_KEY)
        const token = generateJWT(access_code, TOKEN_KEY)
        return resp.json({ token: token });
    }
    else {
        return resp.json({ error: 'Invalid user' });
    }
}