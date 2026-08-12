import { useCallback, useEffect, useState } from "react";
import { PRODUCTIVITY_METHODS } from "../constants/productivityMethods";
import { useStorage } from "./useStorage";

export function useFlowBreak() {
  const { data, loading, update } = useStorage();

  const [seconds, setSeconds] = useState(0);
  const [breakActive, setBreakActive] = useState(false);

  const selectedMethod =
    PRODUCTIVITY_METHODS.find(
      (m) => m.id === data?.productivityMethod
    ) ?? PRODUCTIVITY_METHODS[0];

  const workSeconds = selectedMethod.workMinutes * 60;
  const breakSeconds = selectedMethod.breakMinutes * 60;

  // Restore timer ketika popup dibuka
  useEffect(() => {
    if (loading || !data) return;

    if (data.timerRunning && data.timerEnd) {
      const remaining = Math.max(
        0,
        Math.ceil(
          (data.timerEnd - Date.now()) / 1000
        )
      );

      setSeconds(remaining);
      setBreakActive(data.timerMode === "break");

      return;
    }

    setSeconds(
      data.timerSeconds > 0
        ? data.timerSeconds
        : workSeconds
    );

    setBreakActive(
      data.timerMode === "break"
    );
  }, [
    loading,
    data?.timerRunning,
    data?.timerEnd,
    data?.timerSeconds,
    data?.timerMode,
    workSeconds,
  ]);

  // Countdown
  useEffect(() => {
    if (!data?.timerRunning) return;
    if (!data.timerEnd) return;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (data.timerEnd! - Date.now()) / 1000
        )
      );

      setSeconds(remaining);
    };

    tick();

    const interval = window.setInterval(
      tick,
      1000
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [
    data?.timerRunning,
    data?.timerEnd,
  ]);

  // Start
  const startTimer = useCallback(async () => {
    if (!data) return;

    const duration =
      data.timerSeconds > 0
        ? data.timerSeconds
        : workSeconds;

    const endTime =
      Date.now() + duration * 1000;

    await update((old) => ({
      ...old,
      timerEnd: endTime,
      timerSeconds: duration,
      timerRunning: true,
      timerMode:
        old.timerMode ?? "work",
    }));

    setSeconds(duration);
    setBreakActive(
      data.timerMode === "break"
    );
  }, [
    data,
    workSeconds,
    update,
  ]);

  // Pause
  const pauseTimer = useCallback(async () => {
    if (!data) return;

    const remaining =
      data.timerEnd
        ? Math.max(
            0,
            Math.ceil(
              (data.timerEnd - Date.now()) / 1000
            )
          )
        : data.timerSeconds;

    await update((old) => ({
      ...old,
      timerEnd: null,
      timerSeconds: remaining,
      timerRunning: false,
    }));

    setSeconds(remaining);
  }, [
    data,
    update,
  ]);

  // Start / Pause
  const toggleTimer = useCallback(async () => {
    if (data?.timerRunning) {
      await pauseTimer();
    } else {
      await startTimer();
    }
  }, [
    data?.timerRunning,
    startTimer,
    pauseTimer,
  ]);

  // Reset
  const stopTimer = useCallback(async () => {
    await update((old) => ({
      ...old,
      timerEnd: null,
      timerSeconds: workSeconds,
      timerRunning: false,
      timerMode: "work",
    }));

    setSeconds(workSeconds);
    setBreakActive(false);
  }, [workSeconds, update]);

  // Water notification
  const scheduleWaterNotification = useCallback(() => {
    chrome.runtime.sendMessage({
      type: "SCHEDULE_WATER",
      minutes: selectedMethod.workMinutes,
    });
  }, [
    selectedMethod.workMinutes,
  ]);

  // Break notification
  const scheduleBreakNotification = useCallback(() => {
    chrome.runtime.sendMessage({
      type: "SCHEDULE_BREAK",
      minutes: selectedMethod.breakMinutes,
    });
  }, [
    selectedMethod.breakMinutes,
  ]);

  // Drink water
  const handleDrinkWater = useCallback(async () => {
    if (!data) return;

    if (
      data.waterToday >= data.waterGoal
    ) {
      return;
    }

    const endTime =
      Date.now() + workSeconds * 1000;

    await update((old) => ({
      ...old,

      waterToday:
        old.waterToday + 1,

      lastDrink:
        new Date().toISOString(),

      timerEnd: endTime,
      timerSeconds: workSeconds,
      timerRunning: true,
      timerMode: "work",
    }));

    setSeconds(workSeconds);
    setBreakActive(false);

    scheduleWaterNotification();
  }, [
    data,
    workSeconds,
    update,
    scheduleWaterNotification,
  ]);

  // Start break
  const handleStartBreak = useCallback(async () => {
    if (!data) return;
    if (breakActive) return;

    if (
      data.breakToday >= data.breakGoal
    ) {
      return;
    }

    const endTime =
      Date.now() + breakSeconds * 1000;

    await update((old) => ({
      ...old,

      timerEnd: endTime,
      timerSeconds: breakSeconds,
      timerRunning: true,
      timerMode: "break",
    }));

    setSeconds(breakSeconds);
    setBreakActive(true);

    scheduleBreakNotification();
  }, [
    data,
    breakActive,
    breakSeconds,
    update,
    scheduleBreakNotification,
  ]);

  // Timer selesai
  useEffect(() => {
    if (!data?.timerRunning) return;
    if (!data.timerEnd) return;
    if (seconds !== 0) return;

    // Jangan anggap timer selesai jika timerEnd
    // masih berada di masa depan.
    if (data.timerEnd > Date.now()) {
      return;
    }

    const finishTimer = async () => {
      if (data.timerMode === "break") {
        await update((old) => ({
          ...old,

          breakToday:
            old.breakToday + 1,

          lastBreak:
            new Date().toISOString(),

          timerEnd: null,
          timerSeconds: workSeconds,
          timerRunning: false,
          timerMode: "work",
        }));

        setBreakActive(false);
        setSeconds(workSeconds);

        return;
      }

      await update((old) => ({
        ...old,

        timerEnd: null,
        timerSeconds: workSeconds,
        timerRunning: false,
        timerMode: "work",
      }));

      setSeconds(workSeconds);
    };

    finishTimer();
  }, [
    data,
    seconds,
    update,
    workSeconds,
  ]);

  const display =
    `${String(
      Math.floor(seconds / 60)
    ).padStart(2, "0")}:` +
    `${String(
      seconds % 60
    ).padStart(2, "0")}`;

  return {
    loading,
    data,
    update,

    countdown: {
      seconds,
      display,
      reset: stopTimer,
      active: data?.timerRunning ?? false,
      toggle: toggleTimer,
      stop: stopTimer,
    },

    breakActive,
    selectedMethod,

    handleDrinkWater,
    handleStartBreak,

    startTimer,
    pauseTimer,
    toggleTimer,

    workSeconds,
    breakSeconds,
  };
}