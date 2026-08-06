import {
  DEFAULT_STORAGE,
  FlowBreakData,
} from "../types/storage";

const KEY = "flowbreak";

export async function loadStorage(): Promise<FlowBreakData> {

  if (!chrome?.storage?.local) {
    return DEFAULT_STORAGE;
  }

  const result = await chrome.storage.local.get(KEY);

  return {
    ...DEFAULT_STORAGE,
    ...(result[KEY] ?? {}),
  };
}

export async function saveStorage(
  data: FlowBreakData
): Promise<void> {

  if (!chrome?.storage?.local) {
    return;
  }

  await chrome.storage.local.set({
    [KEY]: data,
  });
}