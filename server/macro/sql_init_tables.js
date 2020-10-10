const mysql = require('mysql');
const config = require('../database/mysql/config');

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password
});


const DB_NAME = 'dilettante'
const TABLE_NAME = "schedules";
//TODO: 0시 정각에 테이블 생성 하도록하기
// crontab 이용해서 node 명령어로 실행하게 하기
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
        const query = "CREATE TABLE IF NOT EXISTS ?? (id int(4), time_stamp DATETIME, booked_data JSON, PRIMARY KEY(id)) AUTO_INCREMENT = 1";
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