import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gursha Bedi Portfolio",
  description:
    "A mobile-first portfolio for Gursha Bedi showcasing styling, creative direction, modeling, and content creation."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
