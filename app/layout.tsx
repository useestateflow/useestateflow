import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://useestateflow.co"),

  title: "EstateFlow — AI Workspace for Real Estate Agents",

  description:
    "EstateFlow helps real estate agents automate listings, manage leads, and streamline client communication with AI-powered workflows built for Africa.",

  keywords: [
    "real estate AI",
    "AI for real estate agents",
    "proptech Africa",
    "real estate CRM",
    "property marketing AI",
    "African real estate technology",
    "AI listing generator",
  ],

  openGraph: {
    title: "EstateFlow — AI Workspace for Real Estate Agents",
    description:
      "AI-powered workflows for modern real estate agents in Africa.",
    url: "https://useestateflow.co",
    siteName: "EstateFlow",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
