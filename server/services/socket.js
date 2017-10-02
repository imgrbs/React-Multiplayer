module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('socket connected')

    socket.on('room', function() {
      console.log('player join')
    })

    socket.on('move', function(data) {
      console.log(data)
      io.emit('play', { player:{name: data.name, top: +data.top, left : +data.left }})
    })
  })
}