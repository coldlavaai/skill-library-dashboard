import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Library | Cold Lava AI",
  description: "Cold Lava agent fleet skill library — packaged skills for AI agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
