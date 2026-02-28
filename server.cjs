const express = require("express");
const connectDB = require("./src/core/config/db");

require('dotenv').config();
const prom = connectDB();

console.log(prom);

const app = express();
app.use(express.json());


app.listen(3000,()=>{
    console.log("Server started on port 3000")
})

