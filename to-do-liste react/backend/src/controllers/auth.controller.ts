// File zur Bearbeitung von Authentifizierungsanfragen
import { Request, Response } from 'express';
import crypto from 'crypto';
import { Account } from '../models/account';



export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: "Username und Passwort sind erforderlich." });
  }

  try {
    const account = await Account.findOne({ userName, password });
    if (!account) {
      return res.status(401).json({ error: "Ungültiger Benutzername oder Passwort." });
    }
    res.json({ message: 'Login erfolgreich', accountId: account.id });
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
 
};

export const register = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: "Username und Passwort sind erforderlich." });
  }

  try {
    const existingAccount = await Account.findOne({ userName });
    if (existingAccount) {
      return res.status(409).json({ error: "Benutzername ist bereits vergeben." });
    }
    const newAccount = new Account({
      id: crypto.randomUUID(),
      userName,
      password,
    });
    await newAccount.save();
    res.status(201).json({ message: 'Registrierung erfolgreich', id: newAccount.id });
  } catch (error) {
    res.status(500).json({ error: "Interner Serverfehler." });
  }
};

