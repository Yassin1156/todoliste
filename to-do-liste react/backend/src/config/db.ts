import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI ;

if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);  //Verbinde dich mit der MongoDB-Datenbank und speichere alles dort.
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};