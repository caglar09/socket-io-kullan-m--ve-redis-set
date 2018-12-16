const express=require('express');
const socket=require('socket.io');
const redis = require('./lib/redis');
let rClient = redis.getClient();
var app=express();

let server=app.listen("4000",function(){
    console.log("4000 portu çalışıyor");
})

app.use(express.static('public'));

let io=socket(server);

io.on('connection',function(socket){
    // console.log("made socket connection",socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data)
        rClient.APPEND("Messages", JSON.stringify(data), function (err) {
          if(err)
            console.log(err);
        })
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    })
})