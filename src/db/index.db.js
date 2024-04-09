import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectionDB = async () => {
    console.log(process.env.MONGO_URI);
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
        
    }
}

export { connectionDB };