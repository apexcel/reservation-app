const User = require('../../database/mongo/schema/user');
const mongoConn = require('../../database/mongo/mongoConn');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_key_0815';

exports.createToken = async function (req, resp, next) {
    try {
        mongoConn.conn();
        const user = await User.findOne(req.body);

        if (user) {
            const token = jwt.sign(
                { userToken: user.username },
                SECRET_KEY,
                { expiresIn: '30m' }
            );

            resp.status(201).json({
                token
            });
        }
        else {
            resp.status(400).json({ error: 'Invalid user' })
        }
        mongoConn.disconn();
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.signInUser = async function (req, resp, next) {
    const searchQuery = {
        username: req.body.username,
        password: req.body.password,
    };

    try {
        mongoConn.conn();
        const matchUser = await User.findOne(searchQuery);

        if (matchUser !== null) {
            resp.status(200).json({
                username: matchUser.username,
                fullname: matchUser.fullname,
                dob: matchUser.dob,
                lessons: matchUser.lessons,
                reservations: matchUser.reservations,
                stamp: new Date().getTime(),
            })
        }
        else {
            resp.status(400).json({ error: 'Invalid User' });
        }
        mongoConn.disconn();
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
            mongoConn.disconn();
            resp.status(201);
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
            const response = {
                username: result.username,
                fullname: result.fullname,
                password: result.password,
                dob: result.dob,
                tel: result.tel,
                lessons: result.lessons,
                reservations: result.reservations
            };
            resp.status(200).json(response);
        }
        else {
            resp.status(500).json({ error: 'Invalid user' });
        }
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err);
        next(err)
    }
    return;
}