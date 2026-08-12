export interface FlowBreakData {
  darkMode: boolean;

  waterToday: number;
  breakToday: number;

  waterGoal: number;
  breakGoal: number;

  productivityMethod: string;

  lastDrink: string | null;
  lastBreak: string | null;

  // Timer
  timerEnd: number | null;
  timerMode: "work" | "break" | null;
  timerSeconds: number;
  timerRunning: boolean;

  // Statistics
  streak: number;
  nextReminderAt: number | null;
}

export const DEFAULT_STORAGE: FlowBreakData = {
  darkMode: false,

  waterToday: 0,
  breakToday: 0,

  waterGoal: 8,
  breakGoal: 5,

  productivityMethod: "pomodoro",

  lastDrink: null,
  lastBreak: null,

  timerEnd: null,
  timerMode: "work",
  timerSeconds: 25 * 60,
  timerRunning: false,

  streak: 0,
  nextReminderAt: null,
};