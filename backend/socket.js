var socketExport = (io) => {
  // let users = [];
  let room;
  let roomIndex;
  const allRooms = [];


  io.on('connection', (socket) => {
    console.log("CONNECTED");
    //Receive data from opening the document
    socket.on('documentId', ({documentId, socketId}) => {
      room = documentId.toString();
      socket.join(room);

      const findRoom = (roomObj) => {
        console.log("FOUND A ROOM THAT EXISTS", roomObj);
        return roomObj.room === room;
      };

      if (allRooms.find(findRoom)){
        allRooms.forEach(function(obj, ind){
          if (allRooms[ind].room === room && allRooms[ind].users.length <= 6){
            roomIndex = ind;
            allRooms[ind].users.push(socketId);
            console.log("ADDED A USER TO CURRENT ROOM", allRooms);
            const index = (allRooms[ind].users.length - 1).toString();
            socket.to(room).emit('joinedRoom', index);
            console.log("JOINED ROOM, NUMBER OF USERS: ", allRooms[ind].users.length);
          } else if (allRooms[ind].room === room && allRooms[ind].users.length > 7 ){
            socket.to(room).emit('tooManyUsers', allRooms[ind].users.length);
          }
        });
      } else {
        console.log("ADD A NEW ROOM WITH A USER", allRooms);
        allRooms.push({
          room: room,
          users: [socketId]
        });
        console.log("NEW USER ADDED AND PUSHED TO NEW ROOM", allRooms);
      }

      // if(allRooms[roomIndex].users.length <= 6){
      //   console.log("JOINED ROOM, NUMBER OF USERS: ", allRooms[roomIndex].users.length);
      //   const index = (allRooms[roomIndex].users.length - 1).toString();
      //   socket.to(room).emit('joinedRoom', index);
      // } else {
      //   socket.to(room).emit('tooManyUsers', allRooms[roomIndex].users.length);
      // }
    });

    socket.on('sendContentState', (cs) => {
      console.log("SEND CONTENT STATE", cs);
      socket.broadcast.to(room).emit('sendBackContentState', cs);
    });

    socket.on('errorMessage', (err) => {
      console.log("ERROR", err);
    });

    socket.on('cursorLocation', (cursor) => {
      console.log("CURSOR MOVETH");
      socket.broadcast.to(room).emit('sendBackCursorLocation', cursor);
    });


    let removeIndex;
    let removeRoom;
    socket.on('disconnectId', ({ socketId, documentId }) => {
      console.log("DISCONNECTID RECEIVED");
      const leaveRoom = documentId;
      socket.leave(leaveRoom);
        allRooms.forEach(function(eachRoom, j){
          if(eachRoom.room === leaveRoom){
            removeIndex = eachRoom.users.indexOf(socketId);
            removeRoom = j;
          }
        });
      allRooms[removeRoom].users.splice(removeIndex, 1);
    });

    socket.on('disconnect', () => {
      console.log("SOCKET DISCONNECTETH");
    });

  });
};

module.exports = socketExport;
