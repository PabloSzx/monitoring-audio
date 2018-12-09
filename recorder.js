var Peer = require("simple-peer");
var io = require("socket.io-client");
var socket = io.connect("http://192.168.0.33");

var peer1 = {};

var socketReady = false;
var d = false;

// socket.on("connection", function(data) {
//   console.log("conexion wena");
//   socket.emit("my other event", { my: "data" });
//   if (d) {
//     socket.emit("recorder", d);
//     //socket.send(d);
//   } else {
//     socketReady = true;
//   }
// });
// socket.on("news", data => {
//   console.log("news!", data);
// });
socket.on("setrecorder", data => {
  peer1.signal(data);
});

// get video/voice stream
navigator.getUserMedia({ audio: true }, gotMedia, function(err) {
  alert("error!!", err);
});

function gotMedia(stream) {
  peer1 = new Peer({
    initiator: true,
    stream: stream,
    trickle: false
  });

  //var peer2 = new Peer({ channelName: "daledale" });

  peer1.on("signal", function(data) {
    console.log("peer1 signal!");
    d = JSON.stringify(data);

    socket.emit("newrecorder", d);
    //console.log("desde peer1 recibi un signal", data);
    //console.log(data);
  });

  // peer2.on("signal", function(data) {
  //   peer1.signal(data);
  // });

  // peer2.on("stream", function(stream) {
  //   // got remote video stream, now let's show it in a video tag
  //   var audio = document.querySelector("audio");
  //   audio.src = window.URL.createObjectURL(stream);
  //   audio.play();
  // });
}
