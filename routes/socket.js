  /**
   * @file enable Socket.io and collaborative editing.
   */
  // import auth from './auth'
  // var express = require('express')
  // var app = require('express')();
  // var server = http.Server(app)
  // var io = socketIO(server)

  export default function (io) {
    // Once user has connected to document
    io.on('connection', function(socket) {
      socket.on('openDocument', (data, next) => {
        socket.join(data.docId)
        next({err: null})
   });

   socket.on('syncDocument', (data, next) => {
     socket.to(data.docId).emit('syncDocument', data)
   })

   socket.on('closeDocument', (data, next) => {
     socket.leave(data.docId)
     next({err: null})
   })
    })
  }
