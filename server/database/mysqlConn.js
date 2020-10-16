const mysql = require('mysql')
const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};
const pool = mysql.createPool(config);

function getConn(callback) {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        callback(conn)
    })
}

module.exports = getConn;