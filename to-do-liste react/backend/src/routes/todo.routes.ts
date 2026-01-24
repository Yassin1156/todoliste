import { Router } from "express";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:todoId", deleteTodo);
router.put("/:todoId", updateTodo);

export default router;