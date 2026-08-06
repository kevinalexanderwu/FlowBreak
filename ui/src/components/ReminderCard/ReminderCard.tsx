interface ReminderCardProps {
  dark: boolean;

  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
  };

  nextType: "Water" | "Break";

  breakActive: boolean;

  NEXT_WATER_SECS: number;

  ClockIcon: React.ComponentType<any>;
  DropIcon: React.ComponentType<any>;
  CoffeeIcon: React.ComponentType<any>;
}

export default function ReminderCard({
  dark,
  countdown,
  nextType,
  breakActive,
  NEXT_WATER_SECS,
  ClockIcon,
  DropIcon,
  CoffeeIcon,
}: ReminderCardProps) {
  return (
    <>
                {/* ── Next Reminder ─────────────────────────────────────────────── */}
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: dark
                      ? 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(20,184,166,0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(20,184,166,0.06) 100%)',
                    border: dark ? '1px solid rgba(59,130,246,0.25)' : '1px solid rgba(59,130,246,0.15)',
                    boxShadow: dark ? '0 2px 16px rgba(59,130,246,0.15)' : '0 2px 16px rgba(59,130,246,0.08)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 500, color: dark ? '#94A3B8' : '#64748B', marginBottom: 4 }}>
                        Next reminder
                      </div>
                    <div
                    className="font-display font-bold"
                    style={{
                        fontSize: 36,
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        color: dark ? "#F1F5F9" : "#0F172A",
                        fontVariantNumeric: "tabular-nums",
                    }}
                    >
                    {`${String(countdown.hours).padStart(2, "0")}:${String(
                        countdown.minutes
                    ).padStart(2, "0")}`}
                    </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {nextType === 'Water' ? (
                          <DropIcon size={12} style={{ color: '#3B82F6' }} />
                        ) : (
                          <CoffeeIcon size={12} style={{ color: '#14B8A6' }} />
                        )}
                        <span style={{ fontSize: 12, fontWeight: 500, color: dark ? '#94A3B8' : '#64748B' }}>
                          {nextType === 'Water' ? 'Drink water' : 'Take a break'}
                        </span>
                      </div>
                    </div>
      
                    {/* Clock decoration */}
                    <div
                      className="flex items-center justify-center rounded-2xl"
                      style={{
                        width: 64,
                        height: 64,
                        background: dark ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.12)',
                        border: dark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(59,130,246,0.2)',
                      }}
                    >
                      <ClockIcon
                        size={28}
                        style={{ color: dark ? '#60A5FA' : '#3B82F6' }}
                        className="animate-pulse-ring"
                      />
                    </div>
                  </div>
      
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div
                      className="rounded-full overflow-hidden"
                      style={{ height: 4, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${100 - (countdown.seconds / NEXT_WATER_SECS) * 100}%`,
                          background: 'linear-gradient(90deg, #3B82F6, #14B8A6)',
                          transition: 'width 1s linear',
                        }}
                      />
                    </div>
                  </div>
                </div>
    </>
  );
}