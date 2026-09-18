import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideOnAuth from "@/components/HideOnAuth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mountiva Journeys",
  description: "Nature-led journeys with a lighter footprint.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-foreground font-sans">
        <Header />
        <div className="flex-1">{children}</div>
        <HideOnAuth>
          <Footer />
        </HideOnAuth>
      </body>
    </html>
  );
}
