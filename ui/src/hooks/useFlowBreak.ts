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

  // Countdown
  useEffect(() => {
    if (seconds <= 0) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [seconds]);

  // Reset countdown
  const resetCountdown = useCallback(() => {
    setBreakActive(false);
    setSeconds(workSeconds);
  }, [workSeconds]);

  // Chrome Extension notification
  const sendNotification = useCallback(
    (title: string, message: string) => {
      if (!chrome?.notifications) {
        console.error("Chrome Notifications API is unavailable.");
        return;
      }

      const manifest = chrome.runtime.getManifest();

      const icons = manifest.icons
        ? Object.values(manifest.icons)
        : [];

      const iconPath = icons[0];

      if (!iconPath) {
        console.error(
          "No extension icon found in manifest.json"
        );
        return;
      }

      chrome.notifications.create(
        {
          type: "basic",
          iconUrl: chrome.runtime.getURL(iconPath),
          title,
          message,
          priority: 2,
        },
        (notificationId) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Notification error:",
              chrome.runtime.lastError.message
            );
            return;
          }

          console.log(
            "Notification created successfully:",
            notificationId
          );
        }
      );
    },
    []
  );

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
  }, [data, update, resetCountdown]);

  // Start break
  const handleStartBreak = useCallback(() => {
    if (breakActive) return;

    setBreakActive(true);
    setSeconds(breakSeconds);
  }, [breakActive, breakSeconds]);

  // Timer reaches zero
  useEffect(() => {
    if (seconds !== 0) return;

    if (breakActive) {
      sendNotification(
        "☕ Break Finished",
        "Your break is over. Time to get back to work."
      );
    } else {
      sendNotification(
        "💧 Time to Drink Water",
        "Your focus session is complete. Take a moment to hydrate."
      );
    }
  }, [seconds, breakActive, sendNotification]);

  // Complete break automatically
  useEffect(() => {
    if (!breakActive || seconds !== 0) return;

    const completeBreak = async () => {
      if (!data) return;

      await update((old) => ({
        ...old,
        breakToday: old.breakToday + 1,
        lastBreak: new Date().toISOString(),
      }));

      setBreakActive(false);
      setSeconds(workSeconds);
    };

    completeBreak();
  }, [
    breakActive,
    seconds,
    data,
    update,
    workSeconds,
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