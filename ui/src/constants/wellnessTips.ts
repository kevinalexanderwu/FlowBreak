export interface WellnessTip {
  label: string;
  icon: string;
  tip: string;
}

export const wellnessTips: WellnessTip[] = [
  {
    label: "Hydration",
    icon: "💧",
    tip: "Drink a glass of water every hour to stay hydrated.",
  },
  {
    label: "Eye Health",
    icon: "👀",
    tip: "Follow the 20-20-20 rule to reduce eye strain.",
  },
  {
    label: "Posture",
    icon: "🪑",
    tip: "Keep your back straight and shoulders relaxed while working.",
  },
  {
    label: "Movement",
    icon: "🚶",
    tip: "Stand up and stretch for at least one minute every hour.",
  },
  {
    label: "Breathing",
    icon: "🫁",
    tip: "Take five deep breaths to refresh your focus.",
  },
  {
    label: "Sleep",
    icon: "😴",
    tip: "Aim for 7–9 hours of sleep every night.",
  },
];