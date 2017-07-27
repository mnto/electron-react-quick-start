var socketExport = (io) => {
  io.on('connection', (socket) => {
    console.log("CONNECTED");
    let room;
    //Receive data from opening the document
    socket.on('documentId', (documentId) => {
      room = documentId.toString();
      socket.join(room);
      console.log("joined room");
    });

    socket.on('sendContentState', (cs) => {
      socket.to(room).emit('sendBackContentState', cs);
    });

    socket.on('sendSelection', selectionState => {
      console.log("RECIEVED SELECTION");
      socket.to(room).emit('sendBackSelection', selectionState);
    });

    socket.on('errorMessage', (err) => {
      console.log("ERROR", err);
    });
  });
};

module.exports = socketExport;
