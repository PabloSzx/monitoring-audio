var Peer = require("simple-peer");
var io = require("socket.io-client");
var socket = io.connect("http://192.168.0.33");
var peer2 = new Peer({
  initiator: false,
  trickle: false
});

console.log("si");
// socket.on("connection", function(data) {
//   console.log("data es: ", data);
//   console.log("conexion wena");
//   socket.emit("my other event", { my: "data" });
//   if (d) {
//     console.log("de esta listo!", d);
//     socket.emit("player", { si: d });
//   } else {
//     console.log("else!");
//     console.log(d);
//     console.log(socketReady);
//     socketReady = true;
//   }
// });
socket.on("setplayer", data => {
  peer2.signal(data);
});

console.log("playerjs");
// get video/voice stream

console.log("xd");
peer2.on("connect", () => {
  console.log("peer2 listo connect");
});
peer2.on("signal", function(data) {
  console.log("peer2 signal!");
  d = JSON.stringify(data);

  console.log("dalele");
  socket.emit("newplayer", d);
  console.log("pase!");
  //peer2.signal(d);
  //console.log("desde peer2 recibi un signal", data);
  //console.log(data);
});

peer2.on("stream", function(stream) {
  // got remote video stream, now let's show it in a video tag
  console.log(stream);
  var audio = document.querySelector("audio");
  try {
    audio.srcObject = stream;
  } catch (error) {
    audio.src = window.URL.createObjectURL(stream);
  }
  audio.play();
});
