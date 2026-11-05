import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduPath | Student Learning Hub",
  description: "A modern student dashboard for courses, study plans, notes and progress."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
