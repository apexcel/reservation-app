const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_key_0815';

// TODO: middleware 구현하기

const verifyToken = (req, resp, next) => {
    try {
        const clientToken = req.body.userToken;
        const decoded = jwt.verify(clientToken, SECRET_KEY);
        if (decoded) {
            resp.locals.username = decoded.username;
            resp.locals.fullname = decoded.fullname;
            next();
        } else {
            resp.status(401).json({ error: 'Unauthorized' });
        }
    } catch (err) {
        resp.status(401).json({ error: 'Token expired' });
    }
};

exports.verifyToken = verifyToken;
