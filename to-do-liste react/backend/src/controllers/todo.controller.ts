import { Request, Response } from "express";

const todos: { content: string; id: string; done: boolean;deadline: string ;projectId: string }[] = [];

export const getTodos = (req: Request, res: Response) => {
  const projectId = req.query.projectId;
  const projectTodos = todos.filter(todo => todo.projectId === projectId);
  res.json(projectTodos);
}

export const createTodo = (req: Request, res: Response) => {
  const { content, projectId, deadline } = req.body;
  if (!content || !projectId || !deadline) {
    return res.status(400).json({ error: "Content, ProjectId und Deadline sind erforderlich." });
  }
  const newTodo = { id: crypto.randomUUID(), content, done: false, deadline, projectId };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const deleteTodo = (req: Request, res: Response) => {
  const { todoId } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo nicht gefunden." });
  }
  todos.splice(todoIndex, 1);
  res.status(204).send();
};

export const updateTodo = (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { done } = req.body;
  const todo = todos.find(todo => todo.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: "Todo nicht gefunden." });
  }
  todo.done = done;
  res.json(todo);
};