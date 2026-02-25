import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kim G. Cañedo | Portfolio",
  description:
    "Aesthetic, responsive portfolio showcasing my journey as an IT student, developer, and leader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
