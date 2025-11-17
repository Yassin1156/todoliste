import { Router } from "express";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller";

const router = Router();


router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/:todoId", deleteTodo);
router.put("/:todoId", updateTodo);

export default router;