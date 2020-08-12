const mongoConn = require('../database/mongo/mongoConn');
const User = require('../database/mongo/schema/user');

async function createDefaultAdmin() {
    await mongoConn.conn();
    const query = {
        fullname: 'admin',
        username: 'admin',
    };
    const adminInfo = {
        fullname: 'admin',
        username: 'admin',
        password: 'pwd0815',
        dob: new Date(),
        tel: 'Default Value',
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
        mongoConn.disconn();
    })
}

createDefaultAdmin();