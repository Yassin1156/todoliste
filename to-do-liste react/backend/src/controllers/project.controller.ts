import e, {Request , Response} from 'express';
import crypto from 'crypto';
import { Project } from '../models/project';



export const getProjects = async (req: Request, res: Response) => {
  const accountId = req.query.accountId;
  if (!accountId) {
    return res.status(400).json({ error: "Account ID ist erforderlich." });
  }

  try {
    const projects = await Project.find({ accountId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { name, accountId } = req.body;
  if (!name || !accountId) {
    return res.status(400).json({ error: "Projektname und Account ID sind erforderlich." });
  }
  try {
    const newProject = new Project({
      id: crypto.randomUUID(),
      name,
      accountId,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const deletedProject = await Project.findOneAndDelete({ id: projectId });
    if (!deletedProject) {
      return res.status(404).json({ error: "Projekt nicht gefunden." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};