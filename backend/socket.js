var socketExport = (io) => {
  io.on('connection', (socket) => {
    console.log("CONNECTED");
    let room;
    //Receive data from opening the document
    socket.on('documentId', (documentId) => {
      room = documentId.toString();
      socket.join(room);
      console.log("JOINED ROOM");
      socket.to(room).emit('joinedRoom');
    });

    socket.on('sendContentState', (cs) => {
      console.log("SEND CONTENT STATE", cs);
      socket.broadcast.to(room).emit('sendBackContentState', cs);
    });

    socket.on('errorMessage', (err) => {
      console.log("ERROR", err);
    });

    socket.on('cursorLocation', (cursor) => {
      console.log("CURSOR MOVES");
      socket.broadcast.to(room).emit('sendBackCursorLocation', cursor);
    });

    socket.on('disconnect', () => {
      console.log("SOCKET DISCONNECTETH");
      socket.leave(room);
    });
  });
};

module.exports = socketExport;
