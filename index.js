var http = require("http");   // import module
var fs = require("fs");
// var path = require('path');
var extract = require("./extract");
var mime = require("mime");   // using MIME Type or Media type: npm install mime first
var ws = require("./websockets-server");

// handling error
var handleError = function (err, res)
{
  // bronze challenge: custom error page
  var filePath = "app/error.html";
  fs.readFile(filePath, function(err, data)
  {
    if(err){
      res.writeHead(404);  // 404 page not found
      res.end(data);
    } else{
      res.setHeader("Content-Type", mime.getType(filePath));
      res.end(data);
    }
  });
};

var server = http.createServer(function (req, res)
{
  console.log("Responding to a requrest.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data)
  {
    if(err){
      handleError(err, res);
      return;
    }
    else{
      //res.setHeader('Content-Type', 'text/html');
      console.log("mime respond: " + mime.getType(filePath));
      res.setHeader("Content-Type", mime.getType(filePath));
      res.end(data);
    }
  });
});
server.listen(3000);
