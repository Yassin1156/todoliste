import e, {Request , Response} from 'express';
import crypto from 'crypto';
import { Project } from '../models/project';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { Account } from '../models/account';



export const getProjects = async (req: AuthenticatedRequest, res: Response) => {
  const accountId = req.user?.accountId;
  if (!accountId) {
    return res.status(400).json({ error: "Account ID ist erforderlich." });
  }

  try {
    const projects = await Project.find({ 
      $or: [{ accountId }, { sharedWith: accountId }]
     });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  const { name } = req.body;
  const accountId = req.user?.accountId;
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

export const shareProject = async (req: AuthenticatedRequest, res: Response) => {
  const ownerId = req.user?.accountId;
  const { id } = req.params;
  const { targetUserName } = req.body;

  const targetAccount = await Account.findOne({ userName: targetUserName });
  if (!targetAccount) {
    return res.status(404).json({ error: "Ziel-Account nicht gefunden." });
  }

  const project = await Project.findOne({ id, accountId: ownerId });
  if (!project) {
    return res.status(404).json({ error: "Projekt nicht gefunden." });
  }

  if (!project.sharedWith.includes(targetAccount.id)) {
    project.sharedWith.push(targetAccount.id);
    await project.save();
  }

  res.json(project);
};
