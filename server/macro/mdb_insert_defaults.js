const mongoose = require('mongoose');
const mongoConn = require('../database/mongo/mongoConn');
const config = require('../database/mongo/config');
const TableHeader = require('../database/mongo/tableHeader');

const tueTable = new TableHeader({
    header: [
        { name: '소정', field: 'so' },
        { name: '상정', field: 'sang', range: [6, 10] },
    ],
    dow: 2
});

const wedTable = new TableHeader({
    header: [
        { name: '소정', field: 'so' },
    ],
    dow: 3
});

const thuTable = new TableHeader({
    header: [
        { name: '소정', field: 'so', range: [6, 10] },
        { name: '현영', field: 'hyun' },
        { name: '상정', field: 'sang' },
    ],
    dow: 4
});

const friTable = new TableHeader({
    header: [
        { name: '소정', field: 'so', range: [6, 10] },
        { name: '현영', field: 'hyun' },
        { name: '상정', field: 'sang' },
    ],
    dow: 5
});

const satTable = new TableHeader({
    header: [
        { name: '상정', field: 'sang' },
    ],
    dow: 6
});

const sunTable = new TableHeader({
    header: [
        { name: '현영', field: 'hyun' },
    ],
    dow: 0
});

const headers = [tueTable, wedTable, thuTable, friTable, satTable, sunTable];

async function insertDefaultDataForTable() {
    await mongoConn.conn();
    await TableHeader.collection.insertMany(headers, (err, res) => {
        if (err) throw err;
        console.log(res);
        mongoConn.disconn();
    })
}

insertDefaultDataForTable();