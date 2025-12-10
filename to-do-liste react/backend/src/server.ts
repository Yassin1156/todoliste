// Nur zum starten des Servers notwendig
import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./middleware/auth.middleware";
import { authMiddleware } from "./middleware/auth.middleware";

dotenv.config();

const port = process.env.PORT || 3001;

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token as string | undefined;
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

// Events: Project-Räume joinen/leaven
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
  httpServer.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });
};

startServer();
