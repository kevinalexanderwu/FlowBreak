import {
  PRODUCTIVITY_METHODS,
  type ProductivityMethod,
} from "../../constants/productivityMethods";

interface Props {
  method: ProductivityMethod;
  selected: string;
  onChange: (id: string) => void;
}

export default function MethodSelector({
  method,
  selected,
  onChange,
}: Props) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(226,232,240,0.9)",
        boxShadow: "0 2px 20px rgba(15,23,42,0.06)",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 14,
        }}
      >
        Productivity Method
      </div>

      {/* Method List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {PRODUCTIVITY_METHODS.map((item) => {
          const active = item.id === selected;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                border: active
                  ? "2px solid #3B82F6"
                  : "1px solid rgba(203,213,225,0.8)",
                background: active
                  ? "rgba(59,130,246,0.08)"
                  : "#FFFFFF",
                borderRadius: 14,
                padding: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: "all .2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                  }}
                >
                  {item.emoji}
                </div>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Method Detail */}
      <div
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 14,
          background: "rgba(59,130,246,0.06)",
          border: "1px solid rgba(59,130,246,0.15)",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            marginBottom: 8,
          }}
        >
          {method.emoji} {method.name}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#475569",
            lineHeight: 1.6,
          }}
        >
          {method.description}
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "#3B82F6",
            fontWeight: 600,
          }}
        >
          ⏱ Focus: {method.workMinutes} min • Break: {method.breakMinutes} min
        </div>
      </div>
    </div>
  );
}