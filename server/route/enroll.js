const express = require('express')
const router = express.Router();
const mysqlConn = require('../database/mysql/mysqlConn');
const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/user');

router.get('/:name', async (req, resp) => {
    console.log(req.params)
    mongoConn.conn();
    const query = await User.findOne({'name': req.params.name})
    mongoConn.disconn()
    console.log(query)
    resp.end();
})

router.post('/update-lessons', async (req, resp) => {
    console.log(req.body);
    mongoConn.conn();
    // TODO: req에 유저 데이터도 같이 가져오기
    // 같이 가져와서 업데이트하기
    const userData = {
        userId: userId,
        userName: userName
    }
    const query = {
        name: req.body.name,
        counter: req.body.counter,
        start: req.body.start,
        end: req.body.end,
        price: req.body.price
    }

    await User.findByIdAndUpdate(
        { name: userData.userName, id: userData.userId },
        { $set: { lessons: query } })

    mongoConn.disconn();
})


module.exports = router;