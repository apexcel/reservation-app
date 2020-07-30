const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

// static
const frontend = path.join(__dirname, '..', 'dist/')
app.use(express.static(frontend))
app.get('/', (req, res) => {
    res.sendFile(frontend)
})
// libs
app.use(cors())
app.use(bodyParser.json())

// route
const api = require('./route/api')
app.use('/api', api)

// env
const port = process.env.port || 9000

// export
module.exports = app;
const server = app.listen(port, () => {
    console.log(`Server running on ${port} port`)
})
module.exports = app;
