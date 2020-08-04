const mongoose = require('mongoose');
const mongoConn = require('../database/mongo/mongoConn');
const TableHeaders = require('../database/mongo/tableHeader');
const { db } = require('../database/mysql/config');

const tueTable = new TableHeaders({
    header: [
        { name: '소정', field: 'so'},
        { name: '상정', field: 'sang', range: [6, 10]},
    ],
    dow: 2
});

const wedTable = new TableHeaders({
    header: [
        { name: '소정', field: 'so'},
    ],
    dow: 3
});

const thuTable = new TableHeaders({
    header: [
        { name: '소정', field: 'so', range: [6, 10]},
        { name: '현영', field: 'hyun'},
        { name: '상정', field: 'sang'},
    ],
    dow: 4
});

const friTable = new TableHeaders({
    header: [
        { name: '소정', field: 'so', range: [6, 10]},
        { name: '현영', field: 'hyun'},
        { name: '상정', field: 'sang'},
    ],
    dow: 5
});

const satTable = new TableHeaders({
    header: [
        { name: '상정', field: 'sang'},
    ],
    dow: 6
});

const sunTable = new TableHeaders({
    header: [
        { name: '현영', field: 'hyun'},
    ],
    dow: 0
});

const headers = [tueTable, wedTable, thuTable, friTable, satTable, sunTable];

async function insertDefaultDataForTable() {
    try {
        mongoConn.conn();
        mongoose.connection;
        console.log("called")
        headers.forEach(el => el.save());
    }
    catch (err) {
        throw err;
    }
    finally {
        await mongoConn.disconn()
    }
}

insertDefaultDataForTable();