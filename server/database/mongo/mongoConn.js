const mongoose = require('mongoose');
const cfg = require('./config')

function conn() {
    return mongoose.connect(cfg.uri, cfg.options, (err) => {
        if (err) throw err;
        console.log('MongoDB connected.');
    });
}

function disconn() {
    return mongoose.disconnect();
}
    

module.exports = {
    conn: conn,
    disconn: disconn
}