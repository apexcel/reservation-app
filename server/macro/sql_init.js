const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});


const DB_NAME = 'dilettante'
const TABLE_NAME = "schedules";
// 당일분 csv파일로 생성하도록 하기

async function generateDataBase(dbName) {
    const query = "CREATE DATABASE IF NOT EXISTS ??";
    connection.query(query, dbName, (err, res) => {
        if (err) throw err;
    });
    return;
}

async function generateTable(tableName) {
    try {
        const query = "CREATE TABLE IF NOT EXISTS ?? (time_stamp varchar(30), booked_data JSON, PRIMARY KEY (time_stamp) )";
        connection.query("USE dilettante");
        connection.query(query, tableName, (err, res) => {
            if (err) throw err;
        });
    }
    catch (err) {
        throw err;
    }
    return;
}

async function executeQuery() {
    await generateDataBase(DB_NAME);
    await generateTable(TABLE_NAME);
    connection.end();
}

module.exports = executeQuery;