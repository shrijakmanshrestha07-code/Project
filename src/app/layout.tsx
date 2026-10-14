import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoodFlix — Find Your Next Favorite",
  description: "Discover TV shows that match your mood with MoodFlix.",
  applicationName: "MoodFlix",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
