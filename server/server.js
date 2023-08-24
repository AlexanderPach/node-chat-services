const connectDB = require('./db/db');
const dotenv = require('dotenv');
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
const io = new Server(httpServer);
