import type { Greeting } from "../types/greeting";

export function getGreeting(): Greeting {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return {
      title: "Good Morning",
      subtitle: "Start your day hydrated and focused.",
      emoji: "☀️",
    };
  }

  if (hour >= 11 && hour < 15) {
    return {
      title: "Good Afternoon",
      subtitle: "Keep your energy up throughout the day.",
      emoji: "🌤️",
    };
  }

  if (hour >= 15 && hour < 19) {
    return {
      title: "Good Evening",
      subtitle: "Take short breaks to stay productive.",
      emoji: "🌇",
    };
  }

  return {
    title: "Good Night",
    subtitle: "Finish your day with a healthy routine.",
    emoji: "🌙",
  };
}