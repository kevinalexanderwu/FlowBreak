export function showWaterNotification() {
    chrome.notifications.create("drink-water-notification", {
        type: "basic",
        iconUrl: "/assets/icons/icon128.png",
        title: "💧 Time to Drink Water",
        message: "Take a moment to drink a glass of water.",
        priority: 2
    });
}

export function showBreakNotification() {
    chrome.notifications.create("break-notification", {
        type: "basic",
        iconUrl: "/assets/icons/icon128.png",
        title: "🧘 Time to Take a Break",
        message: "Stand up, stretch, and rest your eyes for a minute.",
        priority: 2
    });
}