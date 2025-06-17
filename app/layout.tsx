import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans, Lustria } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lustria = Lustria({
  variable: '--font-lustria',
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "3D Homes",
  description: "Mini Real Estate Floor Selector",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${geistMono.variable} ${lustria.variable} relative antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
