import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { subscribePush } from "../controllers/push.controller";

const router = Router();

router.use(authMiddleware);

router.post("/subscribe", subscribePush);


export default router;
