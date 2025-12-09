import { Router } from "express";
import { getProjects, createProject, deleteProject } from "../controllers/project.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { shareProject } from "../controllers/project.controller";

const router = Router();
router.use(authMiddleware);

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:projectId", deleteProject);
router.post("/:id/share", shareProject);

export default router;