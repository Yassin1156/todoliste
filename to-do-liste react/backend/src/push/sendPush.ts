import webpush from "web-push";
import { PushSubscription } from "../models/pushSubsciption";

export async function sendPushToAccount(
  accountId: string,
  payload: { title: string; body: string; url?: string }
) {
  const entry = await PushSubscription.findOne({ accountId });
  if (!entry) return;

  try {
    await webpush.sendNotification(
      entry.subscription as any,
      JSON.stringify(payload)
    );
  } catch (err: any) {
    // Subscription ungültig → löschen
    if (err?.statusCode === 410 || err?.statusCode === 404) {
      await PushSubscription.deleteOne({ accountId });
    }
    console.error("Push error:", err);
  }
}
