// File zur Bearbeitung von Authentifizierungsanfragen
import { Request, Response } from 'express';
import crypto from 'crypto';

const accounts: { id: string; userName: string; password: string }[] = [];

export const login = (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: "Username und Passwort sind erforderlich." });
  }

  const account = accounts.find(acc => acc.userName === userName && acc.password === password);
  if (!account) {
    return res.status(401).json({ error: "Ungültiger Benutzername oder Passwort." });
  }

  return res.json({ message: 'Login erfolgreich', accountId: account.id });
};

export const register = (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: "Username und Passwort sind erforderlich." });
  }

  const existingAccount = accounts.find(acc => acc.userName === userName);
  if (existingAccount) {
    return res.status(409).json({ error: "Benutzername ist bereits vergeben." });
  }

  const id = crypto.randomUUID();
  accounts.push({ id, userName, password });

  res.json({ message: 'Registrierung erfolgreich', userName, id });
};

