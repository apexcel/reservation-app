const mongoose = require('mongoose');
const config = {
    uri: process.env.MONGODB_URI,
    options: {
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

mongoose.set('useFindAndModify', false);

const mdbConn = () => {
    mongoose.connect(config.uri, config.options, (err) => {
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