const getConn = require('../../database/mysql/mysqlConn');
const initDb = require('../../macro/sql_init_tables');

const DB_NAME = 'dilettante';
const TABLE_NAME = 'schedules';

exports.getBookedData = async function (req, resp, next) {
    try {
        await getConn((conn) => {
            console.log(req.params)
            const selectedDate = `${new Date(req.params.date).toDateString()}%`;
            const query = "SELECT * FROM ?? WHERE time_stamp LIKE ?";
            const queryParams = [TABLE_NAME, selectedDate];
            conn.query(query, queryParams, (err, row) => {
                if (err) {
                    console.error(err);
                    return resp.status(500).json({ msg: "Can not find table" });
                }
                console.log(row)
                conn.release();
                return resp.status(200).json(row);
            });
        });
    }
    catch (err) {
        throw err;
    }
    return;
}

exports.setBookedData = async function (req, resp, next) {
    try {
        await getConn((conn) => {
            const query = "UPDATE ?? SET booked_data = (?) WHERE time_stamp = ?;";
            const queryParams = [
                DB_NAME,
                req.body.booked_data, // JSON.stringify
                req.body.time_stamp // DATETIME 타입
            ];

            conn.query(query, queryParams, (err, row) => {
                if (err) throw err;
                resp.status(200).json(row)
            })
            conn.release();
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

// TODO: 수정필요
exports.findReservation = async function (req, resp, next) {
    await getConn(async (conn) => {
        const query = 'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE COLUMN_NAME=?';
        const queryParams = 'booked_data'

        await conn.query(query, queryParams, async (err, res) => {
            if (err) throw err;
            const tableNames = res.map((el, idx) => el['TABLE_NAME']);
            searchBookedUser(tableNames);
        })
        conn.release();
    })

    function searchBookedUser(_tableNames) {
        getConn(async (conn) => {
            let resultSet = [];
            for (let i = 0; i < _tableNames.length; i += 1) {
                const query2 = 'SELECT * FROM ?? WHERE booked_data LIKE ?';
                await conn.query(query2, ([_tableNames[i], `%${req.body.fullname}%`]), (err, res) => {
                    if (err) throw err;
                    if (res !== null && res.length > 0) {
                        const emptyObj = {};
                        Object.defineProperty(emptyObj, _tableNames[i], {
                            value: res,
                            writable: false,
                            enumerable: true
                        });
                        resultSet.push(emptyObj);
                    }
                    if (i === _tableNames.length - 1) {
                        resp.status(200).send(resultSet);
                        conn.release();
                    }
                })
            }
        })
    }
    return;
}