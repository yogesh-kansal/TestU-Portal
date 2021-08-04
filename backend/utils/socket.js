const socketIo = require("socket.io");
const config= require('./config');

exports.setUp =(server) => {
    io = socketIo(server, {
        cors: {
          origin: config.clientUrl
        }
      });

    io.on("connection",(socket) => {
        console.log('connected to socket',socket.id);

        socket.on("emit", (list) => {
          console.log(list);
          io.sockets.emit("updated",list);
        })

        socket.on("disconnect",() =>{
            console.log("user disconnected!!!");
        })})
}