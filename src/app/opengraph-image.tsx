import { ImageResponse } from "next/og";

/*
  Social share card, used when the link is posted on WhatsApp, LinkedIn or X.
  The mark is read from icon.svg rather than redrawn, so the card, the tab
  icon and the loader all come from the one set of geometry.

  Edge runtime: the Node build of next/og fails to prerender on Windows
  (fileURLToPath on its own bundled assets), and Edge is the documented
  runtime for these anyway. It has no fs, so the SVG loads via import.meta.
*/
export const runtime = "edge";
export const alt = "DevFest Chandigarh 2026, 24 October, by GDG Cloud Chandigarh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1E1E1E";
const PALETTE = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

export default async function OpenGraphImage() {
  const svg = await fetch(new URL("./icon.svg", import.meta.url)).then((r) => r.text());
  const mark = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FCF2F2",
          border: `12px solid ${INK}`,
          padding: "56px 72px",
          color: INK,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} alt="" width={220} height={220} style={{ marginTop: -60, marginLeft: -12 }} />

        <div style={{ display: "flex", flexDirection: "column", marginTop: -40 }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>DevFest Chandigarh 2026</div>
          <div style={{ fontSize: 40, marginTop: 20, opacity: 0.75 }}>24 October 2026 · Chandigarh</div>
          <div style={{ fontSize: 30, marginTop: 14, opacity: 0.55 }}>Talks · Workshops · Hackathon · by GDG Cloud Chandigarh</div>
        </div>

        <div style={{ display: "flex", height: 14, gap: 10 }}>
          {PALETTE.map((c) => (
            <div key={c} style={{ flex: 1, background: c, borderRadius: 7 }} />
          ))}
        </div>
      </div>
    ),
    size
  );
}
