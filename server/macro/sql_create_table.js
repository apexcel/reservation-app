const db = require('../db');

const COLUMN_LENGTH = 10;
const connection = db.init();
db.conn(connection);

const now = new Date();
const TABLE_NAME = "time_table";
//TODO: 0시 정각에 테이블 생성 하도록하기
// crontab 이용해서 node 명령어로 실행하게 하기
// 당일분 csv파일로 생성하도록 하기
function generateTable(tableName) {
    const now = new Date().valueOf();
    for (let i = 1; i <= 31; i += 1) {
        const newDate = new Date(now + (86_400_000 * i));
        const query = "CREATE TABLE IF NOT EXISTS ?? (time int(3) AUTO_INCREMENT, booked_data JSON, PRIMARY KEY(time)) AUTO_INCREMENT = 1";
        const dbTableName = tableName + newDate.getFullYear() + (newDate.getMonth() + 1) + newDate.getDate();

        connection.query(query, dbTableName, (err, result) => {
            if (err) throw err;
        });
        insetTableData(dbTableName);
    }
}

function insetTableData(tableName) {
    for (let i = 1; i <= COLUMN_LENGTH; i += 1) {
        const query = "INSERT IGNORE INTO ?? (time) VALUES(?)";
        const query_data = [tableName, i];
        connection.query(query, query_data, (err, result) => {
            if (err) throw err;
        })
    }
}

async function executeQuery() {
    await generateTable(TABLE_NAME);
    //await insetTableData(TABLE_NAME);
    connection.end();
}

executeQuery();