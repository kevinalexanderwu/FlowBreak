chrome.runtime.onInstalled.addListener(() => {
    console.log("FlowBreak installed");
});

chrome.alarms.onAlarm.addListener(async (alarm) => {

    if (alarm.name !== "flowbreak")
        return;

    chrome.notifications.create({
        type: "basic",
        iconUrl: "assets/icons/icon128.png",
        title: "💧 FlowBreak",
        message: "Time to drink water!",
        priority: 2,
    });

});