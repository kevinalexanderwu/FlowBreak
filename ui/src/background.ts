chrome.runtime.onInstalled.addListener(() => {
  console.log("FlowBreak background started");
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== "flowbreak") return;

  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon128.png",
    title: "FlowBreak",
    message: "Time to drink water 💧",
  });
});