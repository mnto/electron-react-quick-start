
module.exports = io.on('connection', (socket) => {
  let room;
  //Receive data from opening the document
  socket.on('documentId', (documentId) => {
    room = documentId.toString();
    socket.join(room);
    socket.on('errorMessage', (err) => {
      console.log("ERROR", err);
    });
  });

  socket.on('sendContentState', (cs) => {
    socket.to(room).emit('sendBackContentState', cs);
  });

});
