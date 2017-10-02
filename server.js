// --------------------
//    ENV FILE CONFIG
// --------------------
require('dotenv').config()

// -----------------------
//   IMPORT DEPENDENCIES
// -----------------------
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

// ----------------------
//     INITIAL SERVER
// ----------------------
const server = express()
server.use(cors())
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// LISTEN PORT 3001
var app = server.listen(3001, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:3001')
})

// INITIAL SOCKET.IO
const io = require('socket.io').listen(app)
server.io = io
require('./server/services/socket')(io)

module.exports = server