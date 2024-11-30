import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error: ${err.message}`);
        } else {
            console.error('Unknown error occurred');
        }
        process.exit(1);
    }
};

export default connectDB;
