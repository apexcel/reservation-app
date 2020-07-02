const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const router = require('./router')
const cors = require('cors')

const server = http.createServer(app)

app.use(cors)
app.use(router)

server.listen(4000, () => {
    console.log(`Server running on 4000 port`)
})