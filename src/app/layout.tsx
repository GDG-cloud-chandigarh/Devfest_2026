import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Stand-in for Google Sans (not freely licensed) — swap via next/font/local when we have the .woff2 files.
const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevFest Chandigarh 2026",
  description:
    "Join us at DevFest Chandigarh 2026 — Chandigarh's largest tech celebration of the year.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
