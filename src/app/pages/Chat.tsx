import { useState } from "react";
import {
  Paperclip,
  Mic,
  Send,
  ChevronDown,
} from "lucide-react";
import { AppSidebar } from "../components/heilsa/AppSidebar";

const C = {
  bg: "#F0F9FF",
  card: "#FFFFFF",
  primary: "#38BDF8",
  primaryDk: "#0EA5E9",
  text: "#0F172A",
  muted: "#64748B",
  border: "#CBD5E1",
  shadow: "0 4px 20px rgba(14,165,233,0.08)",
};

function AIAvatar() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    </div>
  );
}

export const Chat = () => {
  const [input, setInput] = useState("");
  const chatHistory = [
    "Sleep analysis May 23",
    "Meal log review",
    "Recovery check",
    "Blood work insights",
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: C.bg,
        overflow: "hidden",
      }}
    >
      <AppSidebar active="chat" footer="compact" chatHistory={chatHistory} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div
          style={{
            background: C.card,
            borderBottom: `1px solid ${C.border}`,
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AIAvatar />
            <div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Heilsa AI</span>
              <span style={{ fontSize: 12, color: "#22C55E", marginLeft: 8 }}>● Online</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 13, color: C.text }}>GPT-4o mini</span>
            <ChevronDown size={13} color={C.muted} />
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* User */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "18px 18px 4px 18px",
                maxWidth: "60%",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              How was my sleep last night?
            </div>
          </div>

          {/* AI reply with chips */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AIAvatar />
            <div style={{ maxWidth: "70%" }}>
              <div
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px 18px 18px 18px",
                  padding: "14px 16px",
                  boxShadow: C.shadow,
                }}
              >
                <p style={{ fontSize: 14, color: C.text, margin: "0 0 12px", lineHeight: 1.6 }}>
                  Your sleep score was <strong>76/100</strong>. You got 7h 24min total with 1h 42min
                  deep sleep — above your average. HRV at wake-up was 71ms, suggesting good
                  recovery.
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["🌙 Sleep Data", "💗 HRV"].map((chip) => (
                    <span
                      key={chip}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        background: "#EFF8FF",
                        color: C.primaryDk,
                        fontSize: 12,
                        border: `1px solid ${C.primary}30`,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4, paddingLeft: 4 }}>
                Source: Apple Watch · AI does not diagnose
              </div>
            </div>
          </div>

          {/* User follow-up */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "18px 18px 4px 18px",
                maxWidth: "60%",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              Yes, compare it to this week's average
            </div>
          </div>

          {/* AI with comparison table */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AIAvatar />
            <div style={{ maxWidth: "70%" }}>
              <div
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: "4px 18px 18px 18px",
                  padding: "14px 16px",
                  boxShadow: C.shadow,
                }}
              >
                <p style={{ fontSize: 14, color: C.text, margin: "0 0 12px", lineHeight: 1.5 }}>
                  Here's last night vs your 7-day average:
                </p>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "6px 8px",
                          color: C.muted,
                          fontWeight: 500,
                        }}
                      >
                        Stage
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "6px 8px",
                          color: C.muted,
                          fontWeight: 500,
                        }}
                      >
                        Last Night
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "6px 8px",
                          color: C.muted,
                          fontWeight: 500,
                        }}
                      >
                        7-Day Avg
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Deep", "1h 42m", "1h 15m"],
                      ["REM", "1h 20m", "1h 35m"],
                      ["Light", "4h 22m", "4h 45m"],
                    ].map(([stage, last, avg]) => (
                      <tr key={stage} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "7px 8px", color: C.text }}>{stage}</td>
                        <td
                          style={{
                            padding: "7px 8px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: C.primaryDk,
                          }}
                        >
                          {last}
                        </td>
                        <td style={{ padding: "7px 8px", textAlign: "right", color: C.muted }}>
                          {avg}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Voice message */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
                padding: "10px 14px",
                borderRadius: "18px 18px 4px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <button
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.3)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="8" height="10" viewBox="0 0 8 10" fill="white">
                  <path d="M1 1l6 4-6 4V1z" />
                </svg>
              </button>
              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                {[4, 7, 5, 9, 6, 8, 5, 7, 4, 6, 8, 5].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 2,
                      height: h,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.7)",
                    }}
                  />
                ))}
              </div>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>0:23</span>
            </div>
          </div>

          {/* Typing */}
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <AIAvatar />
            <div
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: "4px 18px 18px 18px",
                padding: "14px 18px",
                boxShadow: C.shadow,
              }}
            >
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 150, 300].map((d) => (
                  <div
                    key={d}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: C.muted,
                      opacity: 0.6,
                      animation: `heilsa-chat-bounce 1s ${d}ms infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div
          style={{
            background: C.card,
            borderTop: `1px solid ${C.border}`,
            padding: "16px 24px",
          }}
        >
          <div
            style={{
              background: "#F8FCFF",
              border: `1.5px solid ${C.border}`,
              borderRadius: 16,
              padding: "12px 14px",
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Heilsa anything…"
              rows={1}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                resize: "none",
                outline: "none",
                fontSize: 14,
                color: C.text,
                fontFamily: "inherit",
                lineHeight: 1.5,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    border: `1px solid ${C.border}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Paperclip size={15} color={C.muted} />
                </button>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    border: `1px solid ${C.border}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Mic size={15} color={C.muted} />
                </button>
              </div>
              <button
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 3px 10px rgba(14,165,233,0.3)",
                }}
              >
                <Send size={15} color="#fff" />
              </button>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 10, color: C.muted, marginTop: 8 }}>
            AI does not provide medical diagnosis. Always consult a healthcare professional.
          </div>
        </div>
      </div>
    </div>
  );
};
