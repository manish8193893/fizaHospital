import mongoose from "mongoose";

const connectDB = async()=>{
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('MONGO_URI is not defined in environment variables');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        if (error.message.includes('Invalid connection string')) {
            console.error('MongoDB connection failed: invalid connection string. Make sure special characters in your password are URL-encoded, such as @ -> %40.');
        } else {
            console.error('MongoDB connection failed:', error.message);
        }
        process.exit(1);
    }
}

export default connectDB;