export interface ProductivityMethod {
  id: string;
  name: string;
  workMinutes: number;
  breakMinutes: number;
  description: string;
  emoji: string;
  subtitle: string;
}

export const PRODUCTIVITY_METHODS = [
  {
    id: "pomodoro",
    name: "Pomodoro",
    emoji: "🍅",
    subtitle: "Classic focus cycle",
    workMinutes: 25,
    breakMinutes: 5,
    description: "Stay focused for 25 minutes before taking a short break.",
  },
  {
    id: "52-17",
    name: "52 / 17",
    emoji: "🧠",
    subtitle: "Deep work session",
    workMinutes: 52,
    breakMinutes: 17,
    description: "Ideal for long periods of concentrated work.",
  },
  {
    id: "90-20",
    name: "90 / 20",
    emoji: "🚀",
    subtitle: "Peak performance",
    workMinutes: 90,
    breakMinutes: 20,
    description: "Designed for extended deep focus.",
  },
  {
    id: "20-20-20",
    name: "20-20-20",
    emoji: "👀",
    subtitle: "Eye protection",
    workMinutes: 20,
    breakMinutes: 1,
    description: "Look away every 20 minutes to reduce eye strain.",
  },
];