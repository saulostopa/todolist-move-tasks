const { MongoClient } = require('mongodb');
require("dotenv").config();

// link server to the database
const uri = process.env.URI;

// create a client connection
const client = new MongoClient(uri)

// start connection
const dbConnect = async () => {
    try {
        await client.connect()
        console.log("db connected")
    } catch (error) {
        console.log(error.message)
    }
}

dbConnect();

// set database collections
const Users = client.db("todolist").collection("users");

module.exports = Users;