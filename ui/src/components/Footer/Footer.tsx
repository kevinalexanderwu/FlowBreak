import type { ComponentType } from "react";

interface FooterProps {
  dark: boolean;
  SettingsIcon: ComponentType<any>;
}

export default function Footer({
  dark,
  SettingsIcon,
}: FooterProps) {
  return (
    <>
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
    </>
  );
}