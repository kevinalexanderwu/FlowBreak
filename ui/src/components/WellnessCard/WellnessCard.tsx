import type { ComponentType } from "react";

interface WellnessTip {
  icon: string;
  title: string;
  text: string;
}

interface WellnessCardProps {
  dark: boolean;
  tip: WellnessTip;
  LeafIcon: ComponentType<any>;
}

export default function WellnessCard({
  dark,
  tip,
  LeafIcon,
}: WellnessCardProps) {
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
                      Wellness tip · {tip.title}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: dark ? '#CBD5E1' : '#374151', margin: 0 }}>
                    <span style={{ marginRight: 6 }}>{tip.icon}</span>
                    {tip.text}
                  </p>
                </div>
    </>
  );
}