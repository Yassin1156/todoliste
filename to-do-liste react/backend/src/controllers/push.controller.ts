import { Response, Request } from "express";
import webpush from "web-push";
import { PushSubscription } from "../models/pushSubsciption";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT!;

//Konfiguriert web-push mit den VAPID Keys
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export const subscribePush = async (req: AuthenticatedRequest, res: Response) => {
  const accountId = req.user?.accountId;
  if (!accountId) return res.status(401).json({ error: "Nicht autorisiert" });

  
  const subscription = req.body;
  if (!subscription?.endpoint) {
    return res.status(400).json({ error: "Ungültige Subscription" });
  }

  await PushSubscription.findOneAndUpdate(
    { accountId },
    { accountId, subscription },
    { upsert: true, new: true }
  );

  res.sendStatus(201);
};

