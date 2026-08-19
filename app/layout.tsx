import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Cal Sans — primary typeface, single weight, self-hosted per kickoff doc §4.
const calSans = localFont({
  src: "./fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans-local",
  display: "swap",
  weight: "400",
});

// Geist Bold — deliberate one-off, used ONLY for pill/badge labels in the
// vehicle-type band (kickoff doc §3 typography exception). Do not use
// elsewhere; Cal Sans is the site-wide typeface. Self-hosted (same as Cal
// Sans) rather than next/font/google since this environment has no network
// access to fonts.googleapis.com.
const geistBold = localFont({
  src: "./fonts/Geist-Bold.woff2",
  variable: "--font-geist-bold-local",
  display: "swap",
  weight: "700",
});

export const metadata: Metadata = {
  title: {
    default: "Acelo Logistics | Premium Vehicle Rentals & Fleet Solutions",
    template: "%s | Acelo Logistics",
  },
  description:
    "Book vetted buses and cars for any move, anywhere in Nigeria. Corporate rentals, event logistics and interstate transport with professional pilots.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${calSans.variable} ${geistBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
