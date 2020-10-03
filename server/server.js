const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// root는 server가 되기 때문에 최상단 루트로 path 변경함.
require('dotenv').config({ path: path.join(__dirname, '..', '/.env') });

const frontend = path.join(__dirname, '..', 'dist/');
const api = require('./routes/api');
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(frontend));
app.use('/api', api);

//TODO: 암호화 복호화 기능 추가
app.get('*', (req, resp) => {
    resp.sendFile(frontend, (err) => {
        if (err) resp.sendStatus(500).end(err);
    })
});

const server = app.listen(port, () => {
    console.log(`Server running on ${port} port`)
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log(socket.client.id)
    socket.on('get', (data) => {
        console.log(data.table)
        socket.broadcast.emit('set', (data.table))
    })
})

module.exports = server;