import express from "express";
import connectDB from "./src/core/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server started on port ${process.env.PORT || 5000}`);
        });

    } catch (err) {
        console.log("Mongoose Connection error", err);
    }
};

startServer();

