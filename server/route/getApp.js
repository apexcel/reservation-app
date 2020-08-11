module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log(socket.client.id)
        io.emit('send', {msg: 'hello'})
        socket.disconnect()
    })
}