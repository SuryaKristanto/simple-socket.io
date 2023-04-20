const express = require("express");
const socketio = require("socket.io");

const app = express();

const server = app.listen(3000, () => {
  console.log("The server is running on port 3000");
});

const io = socketio(server);

io.on("connection", (socket) => {
  // console.log socket id everytime a socket connected
  console.log(`socket ${socket.id} connected`);

  socket.on("chat all", (msg) => {
    // emit an event to all connected sockets
    io.emit("hello all", msg);
  });

  // listen to the "client message" event
  socket.on("client message", (msg) => {
    console.log(`message from socket ${socket.id}: ${msg}`);

    // send a response back to the client
    io.to(socket.id).emit("client message received", "message received by server");
  });

  // console.log socket id everytime a socket disconnected
  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});
