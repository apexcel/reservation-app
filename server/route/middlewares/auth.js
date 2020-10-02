const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const TOKEN_KEY = process.env.TOKEN_KEY;

const createAccessToken = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret'
        }
    });

    console.log(privateKey, publicKey)
};
createAccessToken();

// const verifyToken = (req, resp, next) => {
//     try {
//         const clientToken = req.body.userToken;
//         const decoded = jwt.verify(clientToken, TOKEN_KEY);
//         if (decoded) {
//             resp.locals.username = decoded.username;
//             resp.locals.fullname = decoded.fullname;
//             next();
//         } else {
//             resp.status(401).json({ error: 'Unauthorized' });
//         }
//     } catch (err) {
//         resp.status(401).json({ error: 'Token expired' });
//     }
// };

// exports.verifyToken = verifyToken;
