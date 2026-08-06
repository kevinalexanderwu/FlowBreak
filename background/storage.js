const DEFAULT_SETTINGS = {
    waterInterval: 30,
    breakInterval: 60,

    waterGoal: 8,
    breakGoal: 5,

    waterToday: 0,
    breakToday: 0,

    lastDrink: null,
    lastBreak: null
};

export async function initializeStorage() {
    const current = await chrome.storage.local.get();

    const merged = {
        ...DEFAULT_SETTINGS,
        ...current
    };

    await chrome.storage.local.set(merged);

    console.log("💾 Storage initialized");
}

export async function getStorage() {
    return await chrome.storage.local.get();
}

export async function incrementWater() {
    const data = await chrome.storage.local.get("waterToday");

    await chrome.storage.local.set({
        waterToday: (data.waterToday || 0) + 1,
        lastDrink: new Date().toISOString()
    });
}

export async function incrementBreak() {
    const data = await chrome.storage.local.get("breakToday");

    await chrome.storage.local.set({
        breakToday: (data.breakToday || 0) + 1,
        lastBreak: new Date().toISOString()
    });
}