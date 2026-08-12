export async function notify(
    title: string,
    message: string
) {

    if (!("Notification" in window))
        return;

    if (Notification.permission === "granted") {

        new Notification(title, {
            body: message,
            icon: "/assets/icons/icon128.png",
        });

        return;
    }

    if (Notification.permission !== "denied") {

        const permission =
            await Notification.requestPermission();

        if (permission === "granted") {

            new Notification(title, {
                body: message,
                icon: "/assets/icons/icon128.png",
            });

        }

    }

}