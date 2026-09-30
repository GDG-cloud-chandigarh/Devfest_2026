import type { Metadata } from "next";
import { headingFont, bodyFont, monoFont } from "@/lib/fonts";
import { Navbar } from "@/components/Navbar";
import { SiteBackground } from "@/components/SiteBackground";
import { SiteLoader } from "@/components/SiteLoader";
import { SpeakerCallBar } from "@/components/SpeakerCallBar";
import { SITE_NAME } from "@/lib/constants";
import { KEYWORDS, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  // Resolves every relative URL below (share image, canonical) to absolute.
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "GDG Cloud Chandigarh", url: "https://gdg.community.dev/gdg-cloud-chandigarh/" }],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@GDGC_Chandigarh",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteLoader />
        <SiteBackground />
        <SpeakerCallBar />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
