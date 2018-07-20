import models from '.././models/./models.js';
const Document = models.Document;
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

    socket.on('syncDocument', (data, next) => {
      Document.findByIdAndUpdate(data.docId, {content: data.rawState})
      .then(doc => {
        socket.to(data.docId).emit('syncDocument', data) //i dont get this part
      })
    })
//EMITTING TO EVERYTHING BUT THE PERSON WHO INITIATED THE SOCKET
    socket.on('openDocument', (data, next) => {
      socket.join(data.docId)
      next({err: null})
    });

    socket.on('closeDocument', (data, next) => {
      socket.leave(data.docId)
      next({err: null})
    })

    // socket.on('share', (data, next) => {
    //   Document.findById(data.docId, doc => {
    //     doc.collaborators.push();
    //   })
    // })
  })}





  //socket.to ==emits it to a room;
  //socket.on===listening to things like syncDocument
  //socket.emit just triggers a event
