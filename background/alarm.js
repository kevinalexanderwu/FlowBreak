export function createWaterAlarm() {
    chrome.alarms.create("drink-water", {
        periodInMinutes: 1
    });

    console.log("💧 Water alarm created");
}