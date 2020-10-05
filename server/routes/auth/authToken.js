const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const TOKEN_KEY = process.env.TOKEN_KEY;
const AES_KEY = process.env.REACT_APP_AES_KEY;

const encryptAES = (data, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

const decryptAES = (cipher, key) => {
    const bytes = CryptoJS.AES.decrypt(cipher, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const verifyToken = (req, resp, next) => {
    if (req.headers.authorization) {
        const token = (req.headers.authorization.split('Bearer ')[1]);
        const decoded = jwt.decode(token, { complete: true });
        const isVerified = jwt.verify(token, TOKEN_KEY, (err) => {
            if (err) {
                resp.json({ error: 'Invalid token' });
                return false;
            }
            return true;
        });

        if (isVerified) {
            resp.locals.user = decryptAES(decoded.payload.access_code, AES_KEY)
            return next();
        }
        else {
            return resp.json({
                error: 'Token expired'
            });
        }
    }
    else {
        return resp.json({
            error: 'Token does not exist'
        });
    }
}

module.exports = verifyToken;