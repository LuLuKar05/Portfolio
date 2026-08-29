import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const barlow = localFont({
  src: [
    { path: "./fonts/Barlow-400-latin.woff2", weight: "400" },
    { path: "./fonts/Barlow-500-latin.woff2", weight: "500" },
    { path: "./fonts/Barlow-600-latin.woff2", weight: "600" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
});

const nasalization = localFont({
  src: "./fonts/Nasalization.woff2",
  variable: "--font-nasalization",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myomyatthiha.com"),
  title: {
    default: "Myo Myat Thiha — Full-stack Engineer",
    template: "%s — Myo Myat Thiha",
  },
  description:
    "Portfolio of Myo Myat Thiha, a full-stack engineer building multi-agent AI, Web3 protocols, and production platforms.",
  alternates: { canonical: "/" },
  authors: [{ name: "Myo Myat Thiha", url: "https://myomyatthiha.com" }],
  creator: "Myo Myat Thiha",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Myo Myat Thiha — Portfolio",
    title: "Myo Myat Thiha — Full-stack Engineer",
    description:
      "Multi-agent AI, Web3 protocols, and production platforms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myo Myat Thiha — Full-stack Engineer",
    description:
      "Multi-agent AI, Web3 protocols, and production platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${jetBrainsMono.variable} ${nasalization.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
