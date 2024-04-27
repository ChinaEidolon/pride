
// const io = require('socket.io')(server, { cors: { origin: '*' } });

const socket = io();

console.log("main accessed");
socket.on('message', message =>{
    console.log(message);
});