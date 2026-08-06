import { useState, useEffect, useCallback, type CSSProperties } from 'react'

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

import { useGreeting } from "./hooks/useGreeting";
import { useCountdown } from "./hooks/useCountdown";

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
    tip: "Staying hydrated improves focus by up to 14%. Your brain is 75% water.",
    icon: "💧",
    label: "Hydration",
  },
  {
    tip: "A 5-minute walk every hour reduces cardiovascular disease risk by 17%.",
    icon: "🚶",
    label: "Movement",
  },
  {
    tip: "Looking at something 20 feet away for 20 seconds every 20 minutes relieves eye strain.",
    icon: "👁️",
    label: "Eye health",
  },
  {
    tip: "Micro-breaks of 1–2 minutes restore alertness as effectively as longer rests.",
    icon: "⏸️",
    label: "Rest",
  },
]

// ── Countdown Hook ────────────────────────────────────────────────────────────
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (!active) return
    if (seconds <= 0) { setActive(false); return }
    const id = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds, active])

  const reset = useCallback((s: number) => { setSeconds(s); setActive(true) }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return { seconds, display: `${mm}:${ss}`, reset, active }
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false)
  const [waterCount, setWaterCount] = useState(4)
  const [breakCount, setBreakCount] = useState(2)
  const [tipIndex] = useState(() => Math.floor(Math.random() * wellnessTips.length))
  const [breakActive, setBreakActive] = useState(false)
  const [waterFlash, setWaterFlash] = useState(false)
  const [breakFlash, setBreakFlash] = useState(false)

  const WATER_GOAL = 8
  const BREAK_GOAL = 5
  const NEXT_WATER_SECS = 23 * 60 + 12  // 23:12
  const tip = wellnessTips[tipIndex]

  const countdown = useCountdown(NEXT_WATER_SECS)

  const nextType = waterCount <= breakCount ? 'Water' : 'Break'

  const dailyCompletion = Math.round(
    ((waterCount / WATER_GOAL + breakCount / BREAK_GOAL) / 2) * 100
  )

  const handleDrinkWater = () => {
    if (waterCount < WATER_GOAL) {
      setWaterCount(c => c + 1)
      setWaterFlash(true)
      setTimeout(() => setWaterFlash(false), 600)
      countdown.reset(25 * 60)
    }
  }

  const handleStartBreak = () => {
    if (breakCount < BREAK_GOAL && !breakActive) {
      setBreakActive(true)
      setBreakFlash(true)
      setTimeout(() => setBreakFlash(false), 600)
      setTimeout(() => {
        setBreakCount(c => c + 1)
        setBreakActive(false)
      }, 5 * 60 * 1000) // 5 min break
    }
  }

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
              onToggleTheme={() => setDark((d) => !d)}
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
            NEXT_WATER_SECS={NEXT_WATER_SECS}
            ClockIcon={ClockIcon}
            DropIcon={DropIcon}
            CoffeeIcon={CoffeeIcon}
          />

          {/* ── Quick Actions ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDrinkWater}
              disabled={waterCount >= WATER_GOAL}
              className="flex items-center justify-center gap-2 rounded-2xl py-3.5"
              style={{
                background: waterCount >= WATER_GOAL
                  ? (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)')
                  : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                color: waterCount >= WATER_GOAL ? (dark ? '#4B5563' : '#94A3B8') : '#FFFFFF',
                border: 'none',
                cursor: waterCount >= WATER_GOAL ? 'not-allowed' : 'pointer',
                boxShadow: waterCount >= WATER_GOAL ? 'none' : '0 4px 14px rgba(59,130,246,0.4)',
                fontWeight: 600,
                fontSize: 13,
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s ease',
              }}
            >
              <DropIcon size={16} />
              Drink Water
            </button>

            <button
              onClick={handleStartBreak}
              disabled={breakCount >= BREAK_GOAL || breakActive}
              className="flex items-center justify-center gap-2 rounded-2xl py-3.5"
              style={{
                background: (breakCount >= BREAK_GOAL || breakActive)
                  ? (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)')
                  : 'linear-gradient(135deg, #14B8A6, #0D9488)',
                color: (breakCount >= BREAK_GOAL || breakActive) ? (dark ? '#4B5563' : '#94A3B8') : '#FFFFFF',
                border: 'none',
                cursor: (breakCount >= BREAK_GOAL || breakActive) ? 'not-allowed' : 'pointer',
                boxShadow: (breakCount >= BREAK_GOAL || breakActive) ? 'none' : '0 4px 14px rgba(20,184,166,0.4)',
                fontWeight: 600,
                fontSize: 13,
                fontFamily: "'Outfit', sans-serif",
                transition: 'all 0.2s ease',
              }}
            >
              <CoffeeIcon size={16} />
              {breakActive ? 'On break…' : 'Start Break'}
            </button>
          </div>

          {/* ── Wellness Tip ──────────────────────────────────────────────── */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: dark ? 'rgba(17,24,39,0.8)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.9)',
              boxShadow: dark
                ? '0 2px 20px rgba(0,0,0,0.3)'
                : '0 2px 20px rgba(15,23,42,0.06)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 28,
                  height: 28,
                  background: dark
                    ? 'rgba(20,184,166,0.2)'
                    : 'rgba(20,184,166,0.12)',
                  border: dark ? '1px solid rgba(20,184,166,0.3)' : '1px solid rgba(20,184,166,0.2)',
                }}
              >
                <LeafIcon size={14} style={{ color: dark ? '#2DD4BF' : '#14B8A6' }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: dark ? '#2DD4BF' : '#14B8A6',
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Wellness tip · {tip.label}
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: dark ? '#CBD5E1' : '#374151', margin: 0 }}>
              <span style={{ marginRight: 6 }}>{tip.icon}</span>
              {tip.tip}
            </p>
          </div>

          {/* ── Footer ───────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between pb-1 pt-0.5">
            <button
              className="flex items-center gap-1.5"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: dark ? '#4B5563' : '#94A3B8',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = dark ? '#9CA3AF' : '#64748B')}
              onMouseLeave={e => (e.currentTarget.style.color = dark ? '#4B5563' : '#94A3B8')}
            >
              <SettingsIcon size={14} />
              <span style={{ fontSize: 11, fontWeight: 500 }}>Settings</span>
            </button>
            <span style={{ fontSize: 10, color: dark ? '#374151' : '#CBD5E1', fontWeight: 500, letterSpacing: '0.02em' }}>
              FlowBreak v1.0.0
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
