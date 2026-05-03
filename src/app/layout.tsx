import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
});

const notoSerif = Noto_Serif({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Terra Coffee | Sanctuary in every sip",
  description:
    "A sanctuary from the city's pace. Slow down, connect, and experience artisanal craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light scroll-smooth ${beVietnamPro.variable} ${notoSerif.variable}`}
    >
      <body className="bg-background text-on-background font-body-md text-body-md flex min-h-full flex-col overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
