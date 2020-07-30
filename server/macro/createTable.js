const db = require('../db');

const COLUMN_LENGTH = 10;
const connection = db.init();
db.conn(connection);

const now = new Date();
const TABLE_NAME = "time_table" + now.getFullYear() + (now.getMonth() + 1) + now.getDate();

function generateTable() {
    const sql = "CREATE TABLE IF NOT EXISTS ?? (time int(3) AUTO_INCREMENT, booked_data JSON, PRIMARY KEY(time)) AUTO_INCREMENT = 1";
    const sql_qm = TABLE_NAME;
    connection.query(sql, sql_qm, (err, result) => {
        if (err) throw err;
    });
}

function insetTableData() {
    for (let i = 1; i <= COLUMN_LENGTH; i += 1) {
        const sql = "INSERT IGNORE INTO ?? (time) VALUES(?)";
        const sql_qm = [TABLE_NAME, i];
        connection.query(sql, sql_qm, (err, result) => {
            if (err) throw err;
        })
    }
}

async function executeQuery() {
    await generateTable();
    await insetTableData();
    connection.end();
}

executeQuery();