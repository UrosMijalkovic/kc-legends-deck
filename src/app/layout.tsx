import type { Metadata } from "next";
import { Exo_2, Rajdhani, Noto_Sans_JP } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KC: Legends of the Pit | Sponsorship Opportunity",
  description: "Become the main sponsor of the next gaming phenomenon. An anime-inspired Karate Combat gaming universe.",
  keywords: ["Karate Combat", "Gaming", "Sponsorship", "Gacha RPG", "Mobile Game"],
  openGraph: {
    title: "KC: Legends of the Pit | Sponsorship Opportunity",
    description: "Become the main sponsor of the next gaming phenomenon",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${exo2.variable} ${rajdhani.variable} ${notoSansJP.variable} antialiased noise-bg`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
