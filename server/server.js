const connectDB = require('./db/db');
const dotenv = require('dotenv');
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const formatMessaging = require('../server/controllers/MessageController');
const { registerUser, loginUser, currentUser, deleteUser, joinRoom } = require('../server/controllers/UserController')
const axios = require('axios')
const userRoutes = require('./routes/userRoutes')

dotenv.config();
connectDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', userRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    socket.on('Join Room', ({ username, room }) => {
        const user = joinRoom(username)

        socket.join(room);

        socket.emit('message', formatMessaging(username, 'Welcome to the Chat Room!'));

        socket.broadcast.to(room).emit('message',
            formatMessaging(username, `Welcome ${username}`)
        )


        socket.on('userMessage', (message) => {
            const user = axios.get('http://localhost:3000/currentUser')
            io.to(room).emit('message', formatMessaging(user.username, message));
        })

        /*
        TODO: Make Functionality for when the user disconnects
        */
    })
})