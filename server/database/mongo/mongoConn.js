const mongoose = require('mongoose');
const cfg = require('./config')

const mdbConn = () => {
    mongoose.connect(cfg.uri, cfg.options, (err) => {
        if (err) throw err;
        console.log('MongoDB connected.');
    });
}

const mdbDisconn = () => {
    mongoose.disconnect();
    console.log('MongoDB Disconnected.');
}


module.exports = {
    conn: mdbConn,
    disconn: mdbDisconn
}