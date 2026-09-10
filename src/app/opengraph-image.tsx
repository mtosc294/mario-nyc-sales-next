import { ImageResponse } from "next/og";

export const alt = "Mario Toscano — NYC sales advisor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#101B2D",
          color: "#F7F8FA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
        }}
      >
        <div
          style={{
            color: "#B8BCC2",
            fontSize: 20,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Mario Toscano
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            marginTop: 18,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 900,
          }}
        >
          NYC sales guidance for owners, buyers, and investors
        </div>
        <div style={{ color: "#B8BCC2", marginTop: 28, fontSize: 24 }}>Pierre Michel</div>
      </div>
    ),
    { ...size },
  );
}
