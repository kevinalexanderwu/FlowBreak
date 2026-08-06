import type { CSSProperties } from "react";

interface DropIconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function DropIcon({
  size = 20,
  className = "",
  style,
}: DropIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}