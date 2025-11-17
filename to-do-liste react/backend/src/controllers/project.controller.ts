import e, {Request , Response} from 'express';

const projects: { id: string; name: string; accountId: string }[] = [];

export const getProjects = (req: Request, res: Response) => {
  const accountId = req.query.accountId;
  if (!accountId) {
    return res.status(400).json({ error: "Account ID ist erforderlich." });
  }

  const accountProjects = projects.filter(project => project.accountId === accountId);
  res.json(accountProjects);
};

export const createProject = (req: Request, res: Response) => {
  const { name, accountId } = req.body;
  if (!name || !accountId) {
    return res.status(400).json({ error: "Projektname und Account ID sind erforderlich." });
  }
  const newProject = { id: crypto.randomUUID(), name, accountId };
  projects.push(newProject);
  res.status(201).json(newProject);
};

export const deleteProject = (req: Request, res: Response) => {
  const { projectId } = req.params;
  const projectIndex = projects.findIndex(project => project.id === projectId);
  if (projectIndex === -1) {
    return res.status(404).json({ error: "Projekt nicht gefunden." });
  }
  projects.splice(projectIndex, 1);
  res.status(204).send();
};