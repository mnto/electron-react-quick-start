var socketExport = (io) => {
  io.on('connection', (socket) => {
    console.log("CONNECTED");
    let room;
    //Receive data from opening the document
    socket.on('documentId', (documentId) => {
      room = documentId.toString();
      socket.join(room);
      socket.people =
      console.log("joined room");
    });

    socket.on('sendContentState', (cs) => {
      socket.broadcast.to(room).emit('sendBackContentState', cs);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
      socket.leave(socket.theOneRoom);
      socket.broadcast.to(room).emit('userLeft');
    });

    socket.on('errorMessage', (err) => {
      console.log("ERROR", err);
    });

  });
};

module.exports = socketExport;
