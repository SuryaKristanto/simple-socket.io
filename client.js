const io = require("socket.io-client");

const socket = io();

// emit an event to send a message
socket.emit("client message");

// listen to the "client message received" event
socket.on("client message received", (msg) => {
  console.log(`server says: ${msg}`);
});
