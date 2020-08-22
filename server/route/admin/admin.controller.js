const Admin = require('../../database/mongo/schema/admin');
const mongoConn = require('../../database/mongo/mongoConn');
const jwt = require('jsonwebtoken');

// TODO: 키 따로 관리하기
const SECRET_KEY = 'secret_key_0815';

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

exports.signUpAdmin = async function(req, resp, next) {
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


exports.getAdminList = async function(req, resp, next) {
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