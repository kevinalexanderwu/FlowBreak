export function createEndTime(durationSeconds: number): number {
  return Date.now() + durationSeconds * 1000;
}

export function getRemainingSeconds(endTime: number): number {
  const remaining = Math.floor((endTime - Date.now()) / 1000);
  return Math.max(remaining, 0);
}

export function formatRemaining(seconds: number): string {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return `${mm}:${ss}`;
}