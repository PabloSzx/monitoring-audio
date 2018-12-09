const express = require("express");
const path = require("path");
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.use(express.static(path.join(__dirname, "test")));

app.get("/recorder", function(req, res) {
  res.sendFile(path.join(__dirname, "./test", "recorder.html"));
});

app.get("/player", function(req, res) {
  res.sendFile(path.join(__dirname, "./test", "player.html"));
});

io.on("connection", function(socket) {
  console.log("conexion al server");

  socket.on("newrecorder", data => {
    io.emit("setplayer", data);
    //console.log("recorder told me: ", data);
  });
  socket.on("newplayer", data => {
    io.emit("setrecorder", data);
    //console.log("player told me: ", data);
  });
});
