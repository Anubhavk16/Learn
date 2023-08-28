


const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const socketEvents = require('./sockets/sockets');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
const routes = require("./routes");
 require("./config/dbconnection");

// Set up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware to configure CORS settings
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
}));

// Use routes
app.use("/", routes);

// Start the HTTP server
const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set up socket events
socketEvents(io);

