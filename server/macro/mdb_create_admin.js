const mongoConn = require('../database/mongo/mongoConn');
const Admin = require('../database/mongo/schema/admin');

async function createDefaultAdmin() {
    await mongoConn.conn();
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
    await Admin.findOneAndUpdate(query, adminInfo, options, (err, res) => {
        if (err) throw err;
        mongoConn.disconn();
    })
}

createDefaultAdmin();