import mongoose from 'mongoose';

async function connectDB(){
    try {
        const connectionInstance=mongoose.connect(process.env.MONGO_URL)//promise
            .then(() => console.log(`/n Connected to MongoDB! 
            ${connectionInstance.connection.host}`));
    }catch(err) {
        console.log("Mongoose Connection error", err);
        process.exit(1);
    }
}

export default connectDB;
