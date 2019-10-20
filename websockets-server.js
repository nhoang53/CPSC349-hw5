var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer
({
  port: port
});
var messages = [];  // array to hold message
var topic = "";

console.log("websockets server started");

// connect to server
ws.on("connection", function (socket)
{
  console.log("client connection established");

  if(topic !== ""){
    socket.send("*** Topic is '" + topic + "'");
  }

  // send out all old messages to each new connection
  messages.forEach(function (msg){
    socket.send(msg);
  });

  // register a callback for message events
  socket.on("message", function (data)
  {
    console.log("message received: " + data);

    var newTopic = data.split(" ");
    if(newTopic[0] === "/topic")
    {
      topic = data.substring(7);
      ws.clients.forEach(function (clientSocket){
        clientSocket.send("*** Topic has changed to '" + topic + "'");
      });
    }
    else{
      messages.push(data);
      // send new messages to all clicents as each new messages comes in
      ws.clients.forEach(function (clientSocket){
        clientSocket.send(data);
      });
    }
  });
});
