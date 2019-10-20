var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer
({
  port: port
});
var messages = [];  // array to hold message

console.log("websockets server started");

ws.on("connection", function (socket)
{
  console.log("client connection established");
  // send out all old messages to each new connection
  messages.forEach(function (msg){
    socket.send(msg);
  });

  // register a callback for message events
  socket.on("message", function (data){
    console.log("message received: " + data);
    messages.push(data);
    // send new messages to all users as each new messages comes in
    ws.clients.forEach(function (clientSocket){
      clientSocket.send(data);
    });
    //socket.send(data);
  });
});
