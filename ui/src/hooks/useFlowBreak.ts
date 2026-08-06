import { useState } from "react";

import { useStorage } from "./useStorage";

export function useFlowBreak() {
  const { data, loading, update } = useStorage();

  const [waterFlash, setWaterFlash] = useState(false);

  const WATER_GOAL = 8;

  async function handleDrinkWater() {
    if (!data) return;
    if (data.waterToday >= WATER_GOAL) return;

    await update((old) => ({
      ...old,
      waterToday: old.waterToday + 1,
      lastDrink: new Date().toISOString(),
    }));

    setWaterFlash(true);

    setTimeout(() => {
      setWaterFlash(false);
    }, 600);
  }

  return {
    data,
    loading,

    waterFlash,

    handleDrinkWater,
  };
}