/* eslint-disable no-restricted-globals */
self.addEventListener("push", (event) => {
  let data = { title: "Todo", body: "Erinnerung", url: "/" };

  try {
    if (event.data) data = event.data.json();
  } catch (_) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification?.data?.url || "/";

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });

      // Wenn schon ein Tab offen ist, fokussieren
      for (const client of allClients) {
        if ("focus" in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }

      // sonst neuen Tab öffnen
      if (clients.openWindow) {
        await clients.openWindow(url);
      }
    })()
  );
});
