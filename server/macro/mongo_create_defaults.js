const mongoConn = require('../database/mongoConn');
const User = require('../database/schema/user');

async function createDefaultAdmin() {
    mongoConn.conn();
    const query = {
        fullname: 'admin',
        username: 'admin',
    };
    const adminInfo = {
        fullname: 'admin',
        username: 'admin',
        password: 'dltt0815',
        isAdmin: true,
    }
    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true,
        useFindAndModify: false
    };
    await User.findOneAndUpdate(query, adminInfo, options, (err, res) => {
        if (err) throw err;
    })
    mongoConn.disconn();
}

async function createDefaultGuest() {
    mongoConn.conn();
    const query = {
        fullname: 'guest',
        username: 'guest',
    };
    const adminInfo = {
        fullname: 'guest',
        username: 'guest',
        password: '08157533',
        isAdmin: false,
    }
    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true,
        useFindAndModify: false
    };
    await User.findOneAndUpdate(query, adminInfo, options, (err, res) => {
        if (err) throw err;
    })
    mongoConn.disconn();
}

module.exports = {
    createDefaultAdmin: createDefaultAdmin,
    createDefaultGuest: createDefaultGuest
}