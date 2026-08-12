import { useCallback, useEffect, useState } from "react";
import { PRODUCTIVITY_METHODS } from "../constants/productivityMethods";
import { useStorage } from "./useStorage";

export function useFlowBreak() {
  const { data, loading, update } = useStorage();

  const [breakActive, setBreakActive] = useState(false);

  const selectedMethod =
    PRODUCTIVITY_METHODS.find(
      (m) => m.id === data?.productivityMethod
    ) ?? PRODUCTIVITY_METHODS[0];

  const workSeconds = selectedMethod.workMinutes * 60;
  const breakSeconds = selectedMethod.breakMinutes * 60;

  const [seconds, setSeconds] = useState(workSeconds);

  // Reset timer when productivity method changes
  useEffect(() => {
    setBreakActive(false);
    setSeconds(workSeconds);
  }, [workSeconds]);

  // Countdown for UI
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (seconds !== 0) return;

    if (breakActive) {
      setBreakActive(false);
      setSeconds(workSeconds);

      chrome.runtime.sendMessage({
        type: "SCHEDULE_WATER",
        minutes: 0.5,
      });
    } else {
      setSeconds(workSeconds);

      chrome.runtime.sendMessage({
        type: "SCHEDULE_WATER",
        minutes: 0.5,
      });
    }
  }, [seconds, breakActive, workSeconds]);

  // Reset countdown
  const resetCountdown = useCallback(() => {
    setBreakActive(false);
    setSeconds(workSeconds);
  }, [workSeconds]);

  // Schedule water notification through service worker
  const scheduleWaterNotification = useCallback(() => {
    chrome.runtime.sendMessage({
      type: "SCHEDULE_WATER",
      minutes: selectedMethod.workMinutes,
    });
  }, [selectedMethod.workMinutes]);

  // Schedule break notification through service worker
  const scheduleBreakNotification = useCallback(() => {
    chrome.runtime.sendMessage({
      type: "SCHEDULE_BREAK",
      minutes: selectedMethod.breakMinutes,
    });
  }, [selectedMethod.breakMinutes]);

  // Drink water
  const handleDrinkWater = useCallback(async () => {
    if (!data) return;

    if (data.waterToday >= 8) return;

    await update((old) => ({
      ...old,
      waterToday: old.waterToday + 1,
      lastDrink: new Date().toISOString(),
    }));

    resetCountdown();

    scheduleWaterNotification();
  }, [
    data,
    update,
    resetCountdown,
    scheduleWaterNotification,
  ]);

  // Start break
  const handleStartBreak = useCallback(async () => {
    if (!data) return;
    if (breakActive) return;

    if (data.breakToday >= 5) return;

    setBreakActive(true);
    setSeconds(breakSeconds);

    scheduleBreakNotification();
  }, [
    data,
    breakActive,
    breakSeconds,
    scheduleBreakNotification,
  ]);

  // Complete break when countdown reaches zero
  useEffect(() => {
    if (!breakActive || seconds !== 0) return;
    if (!data) return;

    const completeBreak = async () => {
      await update((old) => ({
        ...old,
        breakToday: old.breakToday + 1,
        lastBreak: new Date().toISOString(),
      }));

      setBreakActive(false);
      setSeconds(workSeconds);

      scheduleWaterNotification();
    };

    completeBreak();
  }, [
    breakActive,
    seconds,
    data,
    update,
    workSeconds,
    scheduleWaterNotification,
  ]);

  const display =
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:` +
    `${String(seconds % 60).padStart(2, "0")}`;

  return {
    loading,
    data,
    update,

    countdown: {
      seconds,
      display,
      reset: resetCountdown,
      active: seconds > 0,
    },

    breakActive,
    selectedMethod,

    handleDrinkWater,
    handleStartBreak,

    workSeconds,
    breakSeconds,
  };
}