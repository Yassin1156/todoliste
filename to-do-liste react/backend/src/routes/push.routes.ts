import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { subscribePush, testPush } from "../controllers/push.controller";

const router = Router();

router.use(authMiddleware);

router.post("/subscribe", subscribePush);
router.post("/test", testPush);

export default router;
