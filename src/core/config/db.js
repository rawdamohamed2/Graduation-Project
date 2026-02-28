const mongoose = require('mongoose');

async function connectDB(){
    try {
        mongoose.connect(process.env.MONGO_URL)//promise
            .then(() => console.log("Connected to MongoDB "));
    }catch(err) {
        console.log("Connection error ", err);
    }
}

module.exports = connectDB;
