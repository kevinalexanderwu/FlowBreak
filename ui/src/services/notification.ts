export function showNotification(
  title: string,
  message: string
) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: "/icon128.png",
    });

    return;
  }

  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(title, {
          body: message,
          icon: "/icon128.png",
        });
      }
    });
  }
}