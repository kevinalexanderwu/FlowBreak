export interface FlowBreakData {
  waterToday: number;
  breakToday: number;

  waterGoal: number;
  breakGoal: number;

  streak: number;

  darkMode: boolean;

  lastDrink: string | null;
  lastBreak: string | null;
  nextReminderAt: string | null;

  productivityMethod: string;
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

