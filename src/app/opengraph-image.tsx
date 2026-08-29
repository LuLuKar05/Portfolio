import { ImageResponse } from "next/og";

export const alt = "Myo Myat Thiha — Full-stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        color: "white",
        background: "#050608",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.18em" }}>
        PORTFOLIO / 2026
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 112, lineHeight: 0.9, fontWeight: 700 }}>
          MYO MYAT
        </div>
        <div style={{ display: "flex", fontSize: 112, lineHeight: 0.9, fontWeight: 700 }}>
          THIHA
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#aeb6bf" }}>
        Multi-agent AI · Web3 protocols · Production platforms
      </div>
    </div>,
    size,
  );
}
