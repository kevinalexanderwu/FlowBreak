import { useEffect, useState } from "react";

import {
  loadStorage,
  saveStorage,
} from "../services/chromeStorage";

import { FlowBreakData } from "../types/storage";

export function useStorage() {
  const [data, setData] = useState<FlowBreakData | null>(null);

  const loading = data === null;

  useEffect(() => {
    loadStorage().then(setData);
  }, []);

  async function update(
    updater: (old: FlowBreakData) => FlowBreakData
  ) {
    if (!data) return;

    const next = updater(data);

    setData(next);

    await saveStorage(next);
  }

  return {
    data,
    loading,
    update,
  };
}