import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tyler Bezuka | Software Developer",
  description:
    "Software developer based in NYC. Building digital experiences and open source projects.",
  keywords: ["software developer", "web developer", "NYC", "Tyler Bezuka", "portfolio"],
  authors: [{ name: "Tyler Bezuka" }],
  openGraph: {
    title: "Tyler Bezuka | Software Developer",
    description:
      "Software developer based in NYC. Building digital experiences and open source projects.",
    url: "https://tylerbezuka.com",
    siteName: "Tyler Bezuka",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyler Bezuka | Software Developer",
    description:
      "Software developer based in NYC. Building digital experiences and open source projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
