import type { FC } from "react";

import DropIcon from "../icons/DropIcon";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import ZapIcon from "../icons/ZapIcon";

interface HeaderProps {
    dark: boolean;
    greeting: string;
    streak: number;
    onToggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({
    dark,
    greeting,
    streak,
    onToggleTheme,
}) => {
    return (
        <>
        {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              {/* Logo mark */}
              <div
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.35)',
                }}
              >
                <DropIcon size={18} className="text-white" />
              </div>
              <div>
                <div
                  className="font-display font-semibold tracking-tight leading-none"
                  style={{
                    fontSize: 18,
                    fontFamily: "'Outfit', sans-serif",
                    color: dark ? '#F1F5F9' : '#0F172A',
                  }}
                >
                  FlowBreak
                </div>
                <div style={{ fontSize: 11, color: dark ? '#94A3B8' : '#64748B', fontWeight: 500 }}>
                  {greeting} 👋
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Streak badge */}
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                style={{
                  background: dark ? 'rgba(251,191,36,0.15)' : 'rgba(251,191,36,0.12)',
                  border: '1px solid rgba(251,191,36,0.25)',
                }}
              >
                <ZapIcon size={11} className="text-amber-400" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#F59E0B' }}>{streak}d</span>
              </div>
              {/* Dark mode toggle */}
              <button
                onClick={onToggleTheme}
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 32,
                  height: 32,
                  background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                  color: dark ? '#94A3B8' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
              </button>
            </div>
          </div>
        </>
    );
};

export default Header;