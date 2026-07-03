import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Orbitron } from "next/font/google";
import { ProgressBar } from "@/components/ProgressBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Reality . | Designer & Developer Portfolio",
  description: "I craft digital experiences at the intersection of design and code — building products that are both beautiful and functional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${orbitron.variable} antialiased`}
    >
      <body className="flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
