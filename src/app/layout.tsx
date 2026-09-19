import type { Metadata } from "next";
import { headingFont, bodyFont, monoFont } from "@/lib/fonts";
import { Navbar } from "@/components/Navbar";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { SiteBackground } from "@/components/SiteBackground";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_TAGLINE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <CinematicFooter />
      </body>
    </html>
  );
}
