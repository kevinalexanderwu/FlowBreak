import { useState } from "react";
import {
  PRODUCTIVITY_METHODS,
  type ProductivityMethod,
} from "../../constants/productivityMethods";

interface Props {
  dark: boolean;
  selected: string;
  onChange: (id: string) => void;
}

export default function MethodDropdown({
  dark,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const selectedMethod =
    PRODUCTIVITY_METHODS.find((m) => m.id === selected) ??
    PRODUCTIVITY_METHODS[0];

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: dark
          ? "rgba(17,24,39,0.8)"
          : "rgba(255,255,255,0.85)",
        border: dark
          ? "1px solid rgba(255,255,255,.08)"
          : "1px solid rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 14,
          marginBottom: 12,
        }}
      >
        Productivity Method
      </div>

      {/* Selected */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 14,
          padding: 12,
          cursor: "pointer",
          textAlign: "left",
          background: dark ? "#1F2937" : "#F8FAFC",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {selectedMethod.emoji} {selectedMethod.name}
          </div>

          <div
            style={{
              fontSize: 12,
              opacity: .7,
              marginTop: 2,
            }}
          >
            Focus {selectedMethod.workMinutes} min • Break{" "}
            {selectedMethod.breakMinutes} min
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all .25s ease",
            boxShadow: open
                ? "0 0 0 3px rgba(59,130,246,.15)"
                : "none",
          }}
        >
          ▼
        </div>
      </button>

      {open && (
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {PRODUCTIVITY_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                onChange(method.id);
                setOpen(false);
              }}
              style={{
                border:
                  selected === method.id
                    ? "2px solid #3B82F6"
                    : "1px solid rgba(0,0,0,.08)",

                borderRadius: 12,

                padding: 10,

                textAlign: "left",

                background:
                  selected === method.id
                    ? "rgba(59,130,246,.08)"
                    : dark
                    ? "#111827"
                    : "#FFFFFF",

                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {method.emoji} {method.name}
              </div>

              <div
                style={{
                  fontSize: 12,
                  opacity: .7,
                }}
              >
                {method.subtitle}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}