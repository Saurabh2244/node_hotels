const express = require('express');
const app = express();

const connectDB = require('./database');
const bodyParser = require('body-parser');
require("dotenv").config();

// Middleware
app.use(bodyParser.json());

// Database Connection
connectDB();

// HTTP --> GET Request
app.get('/', function (req, res) {
    res.send("Welcome to my hotel...");
});

// Import the router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

// use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Server is activated on PORT ${PORT}`);
})