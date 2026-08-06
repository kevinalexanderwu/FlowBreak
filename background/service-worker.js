import { createWaterAlarm } from "./alarm.js";
import { showWaterNotification } from "./notifications.js";
import { initializeStorage } from "./storage.js";

console.log("🚀 FlowBreak Service Worker Started");

chrome.runtime.onInstalled.addListener(async () => {

    console.log("✅ Extension Installed");

    await initializeStorage();

    createWaterAlarm();

});

chrome.runtime.onStartup.addListener(() => {

    console.log("🚀 Browser Started");

    createWaterAlarm();

});

chrome.alarms.onAlarm.addListener((alarm) => {

    console.log("⏰ Alarm Triggered:", alarm.name);

    if (alarm.name === "drink-water") {

        showWaterNotification();

    }

});