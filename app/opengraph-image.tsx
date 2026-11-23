import { ImageResponse } from "next/og";

// Link-preview card for every page: the stacked-die mark and the name on the site's white, navy and red.
export const alt = "cuzmayb";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#ffffff", color: "#13213c" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {[108, 132, 156, 180].map((w, i) => (
            <div key={w} style={{ width: w, height: 30, marginTop: 12, borderRadius: 8, background: "#c8102e", opacity: 0.46 + i * 0.18 }} />
          ))}
        </div>
        <div style={{ marginTop: 36, fontSize: 132, fontWeight: 700, letterSpacing: -6 }}>cuzmayb</div>
        <div style={{ marginTop: 12, fontSize: 34, color: "#5b6478" }}>Semiconductor studies and project notes</div>
      </div>
    ),
    size,
  );
}
