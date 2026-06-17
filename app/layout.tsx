import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 1:20 Trading Blueprint",
  description:
    "Five Smart Money Concept setups, one asymmetric framework. Learn to read liquidity, structure, and order blocks the way institutions move price.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
