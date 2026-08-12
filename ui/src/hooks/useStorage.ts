import { useCallback, useEffect, useState } from "react";

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

  const update = useCallback(
    async (
      updater: (old: FlowBreakData) => FlowBreakData
    ) => {
      const current = await loadStorage();

      const next = updater(current);

      await saveStorage(next);

      setData(next);
    },
    []
  );

  return {
    data,
    loading,
    update,
  };
}