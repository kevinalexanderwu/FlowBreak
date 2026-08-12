import { useState } from 'react'

import Header from "./components/Header/Header";
import ProgressCard from "./components/ProgressCard/ProgressCard";
import ReminderCard from "./components/ReminderCard/ReminderCard";
import QuickActions from "./components/QuickActions/QuickActions";
import WellnessCard from "./components/WellnessCard/WellnessCard";
import Footer from "./components/Footer/Footer";
import CoffeeIcon from "./components/icons/CoffeeIcon";
import ClockIcon from "./components/icons/ClockIcon";
import DropIcon from "./components/icons/DropIcon";
import LeafIcon from "./components/icons/LeafIcon";
import SettingsIcon from "./components/icons/SettingsIcon";
import { useFlowBreak } from "./hooks/useFlowBreak";
import MethodDropdown from "./components/MethodDropdown/MethodDropdown";
import { PRODUCTIVITY_METHODS } from "./constants/productivityMethods";
import { wellnessTips } from "./constants/wellnessTips";



// ── Circular Progress ──────────────────────────────────────────────────────────
function CircularProgress({
  value,
  max,
  size = 72,
  strokeWidth = 6,
  color,
  trackColor,
  children,
}: {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  color: string
  trackColor: string
  children?: React.ReactNode
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(value / max, 1)
  const dashOffset = circumference * (1 - progress)

  return (
    <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}


// ── Wellness Tips ─────────────────────────────────────────────────────────────
const wellnessTips = [
  {
    title: "Hydration",
    text: "Staying hydrated improves focus by up to 14%. Your brain is 75% water.",
    icon: "💧",
  },
  {
    title: "Movement",
    text: "A 5-minute walk every hour reduces cardiovascular disease risk by 17%.",
    icon: "🚶",
  },
  {
    title: "Eye Health",
    text: "Looking at something 20 feet away for 20 seconds every 20 minutes relieves eye strain.",
    icon: "👁️",
  },
  {
    title: "Rest",
    text: "Micro-breaks of 1–2 minutes restore alertness as effectively as longer rests.",
    icon: "⏸️",
  },
];

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const {
    data,
    loading,
    update,
    countdown,
    breakActive,
    selectedMethod,
    handleDrinkWater,
    handleStartBreak,
    startTimer,
    pauseTimer,
    workSeconds,
  } = useFlowBreak();

  const [tipIndex] = useState(() => Math.floor(Math.random() * wellnessTips.length));
  const tip = wellnessTips[tipIndex];
  const [waterFlash, setWaterFlash] = useState(false);
  const [breakFlash, setBreakFlash] = useState(false);

  const WATER_GOAL = 8;
  const BREAK_GOAL = 5;

  if (loading || !data) {
    return (
      <div
        style={{
          width: 360,
          height: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Loading...
      </div>
    );
  }
  const dark = data.darkMode;
  const waterCount = data.waterToday;
  const breakCount = data.breakToday;

  const nextType = waterCount <= breakCount ? 'Water' : 'Break'

  const dailyCompletion = Math.round(
    ((waterCount / WATER_GOAL + breakCount / BREAK_GOAL) / 2) * 100
  )


  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div
        className="relative mx-auto flex flex-col overflow-hidden"
        style={{
          width: 360,
          minHeight: 600,
          fontFamily: "'Inter', sans-serif",
          background: dark
            ? 'linear-gradient(160deg, #0A0F1E 0%, #0D1526 100%)'
            : 'linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 100%)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: dark
              ? 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)',
            top: -80,
            right: -60,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: dark
              ? 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
            bottom: 120,
            left: -40,
          }}
        />

        <div className="flex flex-col gap-3 p-4 pb-2 relative z-10 animate-fade-in">

        <Header
            dark={dark}
            greeting={getGreeting()}
            streak={7}
            onToggleTheme={async () => {
                await update((old) => ({
                    ...old,
                    darkMode: !old.darkMode,
                }));
            }}
        />

          {/* ── Today's Progress ──────────────────────────────────────────── */}
          <ProgressCard
              dark={dark}
              waterCount={waterCount}
              breakCount={breakCount}
              waterGoal={WATER_GOAL}
              breakGoal={BREAK_GOAL}
              waterFlash={waterFlash}
              breakFlash={breakFlash}
          />

          <ReminderCard
            dark={dark}
            countdown={countdown}
            nextType={nextType}
            breakActive={breakActive}
            NEXT_WATER_SECS={workSeconds}
            ClockIcon={ClockIcon}
            DropIcon={DropIcon}
            CoffeeIcon={CoffeeIcon}
          />
          <MethodDropdown
              dark={dark}
              selected={data.productivityMethod}
          onChange={async (id) => {
            const method =
              PRODUCTIVITY_METHODS.find(
                (m) => m.id === id
              )!;

            await update((old) => ({
              ...old,

              productivityMethod: id,

              // Reset timer ke durasi metode baru
              timerEnd: null,
              timerSeconds: method.workMinutes * 60,
              timerRunning: false,
              timerMode: "work",
            }));

            chrome.alarms.clear("flowbreak");

            chrome.alarms.create("flowbreak", {
              delayInMinutes: method.workMinutes,
            });
          }}
          />
          <QuickActions
            dark={dark}
            waterCount={waterCount}
            breakCount={breakCount}
            WATER_GOAL={WATER_GOAL}
            BREAK_GOAL={BREAK_GOAL}
            breakActive={breakActive}
            handleDrinkWater={handleDrinkWater}
            handleStartBreak={handleStartBreak}
            DropIcon={DropIcon}
            CoffeeIcon={CoffeeIcon}
          />
          {/* ── Wellness Tip ──────────────────────────────────────────────── */}
          <WellnessCard
              dark={dark}
              tip={tip}
              LeafIcon={LeafIcon}
          />

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <Footer
              dark={dark}
              SettingsIcon={SettingsIcon}
          />

        </div>
      </div>
    </div>
  )
}
