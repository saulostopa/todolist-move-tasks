const express = require('express');
const cors = require('cors');
const Users = require('./config/database');
const { getUsers } = require('./api/Users');
const { addATask, moveTask } = require('./api/Tasks');
require("dotenv").config();

// declaring the port of server
const port = process.env.PORT || 8000;

// creating the aplication
const app = express();

// add cors for making the code suitable for different platforms.
app.use(cors());

// set result type
app.use(express.json())

// get all users from db
getUsers(app,Users);

// add task 
addATask(app,Users);

// move task to right or left
moveTask(app,Users);

// the first api
app.get("/", (req, res) => {
    res.send("server is running!")
})

// listening the server
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})