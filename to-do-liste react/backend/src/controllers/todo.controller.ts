import { Request, Response } from "express";
import crypto from "crypto";
import { Todo } from "../models/todo";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { Project } from "../models/project";



export const getTodos = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.query.projectId;
  if (!projectId) {
    return res.status(400).json({ error: "Project ID ist erforderlich." });
  }



  try {
    const todos = await Todo.find({ projectId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
}

export const createTodo = async (req: Request, res: Response) => {
  const { content, projectId, deadline } = req.body;
  if (!content || !projectId || !deadline) {
    return res.status(400).json({ error: "Content, ProjectId und Deadline sind erforderlich." });
  }
  try {
    const newTodo = new Todo({ id: crypto.randomUUID(), content, done: false, deadline, projectId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const deletedTodo = await Todo.findOneAndDelete({ id: todoId });
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo nicht gefunden." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { done } = req.body;
  try {
    const updatedTodo = await Todo.findOneAndUpdate({ id: todoId }, { done }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo nicht gefunden." });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};