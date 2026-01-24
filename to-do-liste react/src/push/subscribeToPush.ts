import api from "../api/client";

// Sorgt dafür, dass der Vapid Public Key in ein Uint8Array umgewandelt wird, sodass die push API ihn nutzen kann
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

export async function subscribeToPush(publicVapidKey: string) {
  if (!("serviceWorker" in navigator)) {  // Prüft ob der Browser Push unterstützt
    console.warn("Service Worker nicht verfügbar");
    return;
  }
  if (!("PushManager" in window)) {
    console.warn("PushManager nicht verfügbar");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission not granted:", permission);
    return;
  }

  const registration = await navigator.serviceWorker.ready;

 
  const existing = await registration.pushManager.getSubscription();
  if (existing) {
    await api.post("/push/subscribe", existing);
    return;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await api.post("/push/subscribe", subscription);
  console.log("Push Registrqierung erfolgreich:");
}
