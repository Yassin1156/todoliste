// Nur zum starten des Servers notwendig
import app from './app'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db';
dotenv.config();

const port = process.env.PORT || 3001;


const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
};

startServer();