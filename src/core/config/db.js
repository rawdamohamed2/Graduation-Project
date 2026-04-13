//import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

// async function connectDB(){
//
//     if (mongoose.connection.readyState === 1) {
//         return;
//     }
//     try {
//         console.log(process.env.MONGO_URL);
//         const db = await mongoose.connect(process.env.MONGO_URL, {
//             serverSelectionTimeoutMS: 5000,
//         });
//         console.log(`Connected to MongoDB! Host: ${db.connection.host}`);
//     } catch (err) {
//         console.log("Mongoose Connection error", err);
//         //process.exit(1);
//     }
// }
import mongoose from 'mongoose';


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URL).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log("Connected to MongoDB");
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}


export default connectDB;
