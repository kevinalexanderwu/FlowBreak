import type { ComponentType } from "react";
interface QuickActionsProps {
  dark: boolean;

  waterCount: number;
  breakCount: number;

  WATER_GOAL: number;
  BREAK_GOAL: number;

  breakActive: boolean;

  handleDrinkWater: () => void;
  handleStartBreak: () => void;

  DropIcon: React.ComponentType<any>;
  CoffeeIcon: React.ComponentType<any>;
}

export default function QuickActions({
  dark,
  waterCount,
  breakCount,
  WATER_GOAL,
  BREAK_GOAL,
  breakActive,
  handleDrinkWater,
  handleStartBreak,
  DropIcon,
  CoffeeIcon,
}: QuickActionsProps) {
  return (
    <>
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
      
    </>
  );
}