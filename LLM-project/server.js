const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');

const server = http.createServer(app);
const socketio = require('socket.io');
// const io = require('socket.io')(server, { cors: { origin: 'localhost:3000' } });
const io = socketio(server);

// any server can use CORS for the origin, and the origin is specified by *

const PORT = 3000 || process.env.PORT;

// app.use(express.static(path.join(__dirname, 'node_modules/socket.io/client-dist')));

// app.use(express.static(path.join(__dirname,'public')));

app.use(express.static('./public'));

app.use(cors());



// emit sends an event out from one socket, for another socket to catch

//io.emit sends to all clients, including server

//socket.broadcast.emit sends to all connected clients except the message sender

//socket.emit, only sends to the sender's client.

//https://socket.io/get-started/private-messaging-part-1/#listing-all-users
// ^^^^ refer to this if you ever have any issues understanding.


io.on('connection',socket=>{

    console.log('New WS Connection...');
    socket.emit('message', 'welcome to ChatCord!');
    console.log("emitted");


    
    socket.emit('activeUsers'); // get connected socket

    socket.emit('getId', socket.id); // get socket ID of connected socket

    // when chat event is emitted
    socket.on('chat',(id, chat) =>{
        io.emit('sendChat', id, chat, socket.id);
    });

    // when a user changes their username
    socket.on('usernameChange', (username, socketid) => {
        socket.broadcast.emit('resetChat', username, socketid);
    });

    // when a user is Typing, basically we'll tell everyone else someone is typing and who.
    socket.on('userTyping', (socketid, type) => {
        socket.broadcast.emit('someoneTyping', socketid, type);
    });

    socket.on('activeUsers', () => {
        // gets all connected sockets
        const onlineUsers = io.engine.clientsCount;
        io.emit('countUsers', onlineUsers);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnectNotification', socket.id);
        const onlineUsers = io.engine.clientsCount;
        socket.broadcast.emit('countUsers', onlineUsers);
    });



});




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });



// app.listen(PORT,() => console.log(`server running up`));

server.listen(3000, () => {
    console.log('listening on 3000');
});

//--------------------------------------------------





// import {io} from 'socket.io-client';
// import './App.css';

// function App(){
//     const toastRef = useRef(null);

//     // create states
//     const [activeUsers, setActiveUsers] = useState(0);
//     const [socket, setSocket] = useState(null);
//     const [id, setId] = useState('');
//     const [socketid, setSocketId] = useState('');
//     const [username, setUsername] = useState('');
//     const [chat, setChat] = useState('');
//     const [allChats, setAllChats] = useState([]);
//     const [notification, setNotification] = useState('');
//     const [someoneTyping, setSomeoneTyping] = useState('');



// }



