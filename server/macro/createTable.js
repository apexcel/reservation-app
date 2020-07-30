const db = require('../db');

const COLUMN_LENGTH = 10;
const connection = db.init();
db.conn(connection);

const now = new Date()
const TABLE_NAME = "time_table" + now.getFullYear() + (now.getMonth() + 1) + now.getDate();

function generateTable() {
    const sql = "CREATE TABLE IF NOT EXISTS ?? (time DATETIME NOT NULL, id varchar(20), PRIMARY KEY(time), FOREIGN KEY(id) REFERENCES users(id)) AUTO_INCREMENT = 1";
    connection.query(sql, TABLE_NAME, (err, result) => {
        if (err) throw err;
    });
}

function insertDateTime() {
    for (let i = 0; i < COLUMN_LENGTH; i += 1) {
        const sql = "INSERT IGNORE INTO ?? (time) VALUES(?)";
        const date = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${13 + i}:00:00`;
        const sql_qm = [TABLE_NAME, date];
        connection.query(sql, sql_qm, (err, result) => {
            if (err) throw err;
        })
    }
    connection.end();
}

async function executeQuery() {
    await generateTable();
    insertDateTime();
}

executeQuery();