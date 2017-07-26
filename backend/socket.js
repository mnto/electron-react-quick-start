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
      console.log("SEND CONTENT STATE", cs);
      socket.to(room).emit('sendBackContentState', cs);
    });

    socket.on('errorMessage', (err) => {
      console.log("ERROR", err);
    });
  });
};

module.exports = socketExport;
