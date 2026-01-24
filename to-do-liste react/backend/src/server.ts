// Nur zum starten des Servers notwendig
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDB } from "./config/db";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./middleware/auth.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import { startTodoReminderScheduler } from "./scheduler/todoReminder";



const port = process.env.PORT || 3001;

const httpServer = http.createServer(app);

export const io = new Server(httpServer, { //Socket.io Server wird erstellt
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token as string | undefined; // Token aus den Socket-Handshake-Daten extrahieren
  if (!token) {
    return next(new Error("Kein Token übergeben"));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    (socket as any).user = decoded; // { accountId, userName, ... }
    next();
  } catch (err) {
    console.error("Socket JWT Fehler:", err);
    next(new Error("Ungültiges Token"));
  }
});

// Diese Methode wird aufgerufen, wenn sich ein Client verbindet oder trennt (Wenn next() aufgerufen wird)
io.on("connection", (socket) => { 
  const user = (socket as any).user;
  console.log("Socket verbunden:", user);

  socket.on("joinProject", (projectId: string) => {
    console.log(`User joined project ${projectId}`);
    socket.join(`project:${projectId}`);
  });

  socket.on("leaveProject", (projectId: string) => {
    console.log(`User left project ${projectId}`);
    socket.leave(`project:${projectId}`);
  });
});

const startServer = async () => {
  await connectDB();
  startTodoReminderScheduler();
  httpServer.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
};

startServer();



