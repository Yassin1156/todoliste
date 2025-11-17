import express from 'express';
import authRouter from './routes/auth.routes';
import projectRouter from './routes/project.routes';
import todoRouter from './routes/todo.routes';

const app = express();
app.use(express.json()); // Middleware zum Parsen von JSON-Anfragen

// Routen für die Authentifizierung

app.use("/api/auth", authRouter); // Bei Anfragen an /api/auth werden die authRouter verwendet
app.use("/api/projects", projectRouter); 
app.use("/api/todos", todoRouter);



export = app;