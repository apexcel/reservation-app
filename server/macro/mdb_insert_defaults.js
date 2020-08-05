const mongoConn = require('../database/mongo/mongoConn');

async function insertDefaultDataForTable() {
    await mongoConn.conn();
    TableHeader.collection.insertMany(headers, (err, res) => {
        if (err) throw err;
        console.log(res);
        mongoConn.disconn();
    })
}

insertDefaultDataForTable();