import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Bouliani | Cinematic Portfolio",
  description: "Designer. Photographer. Filmmaker. Audio Engineer. Crafting powerful brands and immersive cinematic experiences.",
  keywords: ["portfolio", "designer", "photographer", "filmmaker", "audio engineer", "cinematic", "creative"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
