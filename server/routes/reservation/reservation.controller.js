const getConn = require('../../database/mysqlConn');
require('../../macro/sql_init')();

const TABLE_NAME = 'schedules';

exports.getBookedData = async function (req, resp, next) {
    try {
        await getConn((conn) => {
            const selectedDate = `${req.params.date}%`;
            const query = "SELECT * FROM ?? WHERE time_stamp LIKE ?";
            const queryParams = [TABLE_NAME, selectedDate];
            conn.query(query, queryParams, (err, row) => {
                conn.release();
                if (err) {
                    console.error(err);
                    return resp.status(500).json({ msg: "Can not find table" });
                }
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
            console.log(req.body)
            const query = "INSERT INTO ?? (time_stamp, booked_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE time_stamp=?, booked_data=?";
            const queryParams = [
                TABLE_NAME,
                req.body.time_stamp,
                req.body.booked_data,
                req.body.time_stamp,
                req.body.booked_data,
            ];
            
            conn.query(query, queryParams, (err, row) => {
                conn.release();
                if (err) throw err;
                resp.status(200).json(row)
            })
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}

exports.getUserReservationList = async function (req, resp, next) {
    console.log(req.params)
    await getConn(async (conn) => {
        const query = 'SELECT * FROM ?? WHERE booked_data LIKE ?';
        const queryParams = [TABLE_NAME, `%${req.params.fullname}%`];

        await conn.query(query, queryParams, (err, res) => {
            conn.release();
            if (err) throw err;
            resp.send(res);
        })
    });
    return;
}