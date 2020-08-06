const mysql = require('mysql')
const config = require('./config')

const pool = mysql.createPool(config.db);

function getConn(callback) {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        callback(conn)
    })
}

module.exports = getConn;