import { Response, Request } from "express";
import webpush from "web-push";
import { PushSubscription } from "../models/pushSubsciption";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@example.com";

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export const subscribePush = async (req: AuthenticatedRequest, res: Response) => {
  const accountId = req.user?.accountId;
  if (!accountId) return res.status(401).json({ error: "Nicht autorisiert" });

  // req.body ist die Subscription (kommt aus pushManager.subscribe)
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

// Nur zum Testen: schickt dir eine Push-Notification
export const testPush = async (req: AuthenticatedRequest, res: Response) => {
  const accountId = req.user?.accountId;
  if (!accountId) return res.status(401).json({ error: "Nicht autorisiert" });

  const entry = await PushSubscription.findOne({ accountId });
  if (!entry) return res.status(404).json({ error: "Keine Subscription gespeichert" });

  const payload = JSON.stringify({
    title: "⏰ Todo Erinnerung",
    body: "Test-Push vom Backend",
    url: "http://localhost:5173/todo",
  });

  try {
    await webpush.sendNotification(entry.subscription as any, payload);
    res.json({ ok: true });
  } catch (err: any) {
    // Wenn Subscription abgelaufen/ungültig → löschen
    if (err?.statusCode === 410 || err?.statusCode === 404) {
      await PushSubscription.deleteOne({ accountId });
    }
    console.error("web-push error:", err);
    res.status(500).json({ error: "Push senden fehlgeschlagen" });
  }
};
