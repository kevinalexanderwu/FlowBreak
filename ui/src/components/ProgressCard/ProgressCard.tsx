import CircularProgress from "../CircularProgress/CircularProgress";

import DropIcon from "../icons/DropIcon";
import CoffeeIcon from "../icons/CoffeeIcon";

interface ProgressCardProps {
    dark: boolean;

    waterCount: number;
    breakCount: number;

    waterGoal: number;
    breakGoal: number;

    waterFlash: boolean;
    breakFlash: boolean;
}

export default function ProgressCard({
    dark,
    waterCount,
    breakCount,
    waterGoal,
    breakGoal,
    waterFlash,
    breakFlash,
}: ProgressCardProps) {

    const dailyCompletion = Math.round(
    ((waterCount + breakCount) / (waterGoal + breakGoal)) * 100
    );


    return (
        <>
            <div
            className="rounded-2xl p-4"
            style={{
              background: dark ? 'rgba(17,24,39,0.8)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.9)',
              boxShadow: dark
                ? '0 2px 20px rgba(0,0,0,0.3)'
                : '0 2px 20px rgba(15,23,42,0.06), 0 1px 4px rgba(15,23,42,0.04)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="font-display font-semibold"
                style={{ fontSize: 14, fontFamily: "'Outfit', sans-serif", color: dark ? '#F1F5F9' : '#0F172A' }}
              >
                Today's Progress
              </span>
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, rgba(59,130,246,0.15), rgba(20,184,166,0.15))`,
                  border: '1px solid rgba(59,130,246,0.2)',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: dark ? '#60A5FA' : '#3B82F6' }}>
                  {dailyCompletion}% complete
                </span>
              </div>
            </div>

            <div className="flex items-center justify-around">
              {/* Water */}
              <div className="flex flex-col items-center gap-2">
                <CircularProgress
                  value={waterCount}
                  max={waterGoal}
                  size={80}
                  strokeWidth={7}
                  color={waterFlash ? '#14B8A6' : '#3B82F6'}
                  trackColor={dark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)'}
                >
                  <div className="flex flex-col items-center">
                    <DropIcon
                      size={16}
                      style={{ color: waterFlash ? '#14B8A6' : (dark ? '#60A5FA' : '#3B82F6') }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 700, color: dark ? '#F1F5F9' : '#0F172A', lineHeight: 1.1 }}>
                      {waterCount}/{waterGoal}
                    </span>
                  </div>
                </CircularProgress>
                <div className="text-center">
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark ? '#F1F5F9' : '#0F172A' }}>Water</div>
                  <div style={{ fontSize: 10, color: dark ? '#94A3B8' : '#64748B' }}>{waterGoal - waterCount} left</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 80, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)' }} />

              {/* Breaks */}
              <div className="flex flex-col items-center gap-2">
                <CircularProgress
                  value={breakCount}
                  max={breakGoal}
                  size={80}
                  strokeWidth={7}
                  color={breakFlash ? '#3B82F6' : '#14B8A6'}
                  trackColor={dark ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.1)'}
                >
                  <div className="flex flex-col items-center">
                    <CoffeeIcon
                      size={16}
                      style={{ color: dark ? '#2DD4BF' : '#14B8A6' }}
                    />
                    <span style={{ fontSize: 11, fontWeight: 700, color: dark ? '#F1F5F9' : '#0F172A', lineHeight: 1.1 }}>
                      {breakCount}/{breakGoal}
                    </span>
                  </div>
                </CircularProgress>
                <div className="text-center">
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark ? '#F1F5F9' : '#0F172A' }}>Breaks</div>
                  <div style={{ fontSize: 10, color: dark ? '#94A3B8' : '#64748B' }}>{breakGoal - breakCount} left</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 80, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)' }} />

              {/* Overall */}
              <div className="flex flex-col items-center gap-2">
                <CircularProgress
                  value={dailyCompletion}
                  max={100}
                  size={80}
                  strokeWidth={7}
                  color="url(#gradientPrimary)"
                  trackColor={dark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)'}
                >
                  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                      <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: dark ? '#F1F5F9' : '#0F172A' }}>
                    {dailyCompletion}%
                  </span>
                </CircularProgress>
                <div className="text-center">
                  <div style={{ fontSize: 12, fontWeight: 600, color: dark ? '#F1F5F9' : '#0F172A' }}>Daily</div>
                  <div style={{ fontSize: 10, color: dark ? '#94A3B8' : '#64748B' }}>goal</div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}