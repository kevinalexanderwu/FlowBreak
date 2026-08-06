import { useEffect, useState } from "react";

export function useReminder(targetTime: string | null) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!targetTime) {
      setRemaining(0);
      return;
    }

    const update = () => {
      const diff =
        new Date(targetTime).getTime() - Date.now();

      setRemaining(Math.max(0, Math.floor(diff / 1000)));
    };

    update();

    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, [targetTime]);

  const hours = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  return {
    remaining,
    display: `${hours}:${minutes}:${seconds}`,
  };
}