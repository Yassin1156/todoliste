import express from 'express';
import authRouter from './routes/auth.routes';
import projectRouter from './routes/project.routes';
import todoRouter from './routes/todo.routes';
import cors from 'cors';
import pushRouter from './routes/push.routes';




const app = express();

app.use(cors(
  {
    origin: 'http://localhost:5173', // Erlaube Anfragen von diesem Ursprung
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Erlaube diese HTTP-Methoden
    allowedHeaders: ['Content-Type', 'Authorization'], // Erlaube das Senden von Cookies
  }
));

app.use(express.json()); // Middleware zum Parsen von JSON-Anfragen

// Routen für die Authentifizierung

app.use("/api/auth", authRouter); // Bei Anfragen an /api/auth werden die authRouter verwendet
app.use("/api/projects", projectRouter); 
app.use("/api/todos", todoRouter);
app.use("/api/push", pushRouter);



export = app;