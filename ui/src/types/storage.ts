export interface FlowBreakData {
  darkMode: boolean;

  waterToday: number;
  breakToday: number;

  waterGoal: number;
  breakGoal: number;

  productivityMethod: string;

  lastDrink: string | null;
  lastBreak: string | null;

  timerEnd: number | null;
}

export const DEFAULT_STORAGE: FlowBreakData = {
  waterToday: 0,
  breakToday: 0,

  waterGoal: 8,
  breakGoal: 5,

  streak: 0,

  darkMode: false,

  lastDrink: null,
  lastBreak: null,
  nextReminderAt: null,
  productivityMethod: "pomodoro",
};

