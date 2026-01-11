import type { Metadata } from "next";
import "./globals.css";
import {Noto_Sans_JP} from "next/font/google"

const NotoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true
})

export const metadata: Metadata = {
  title: "AI SaaS Application",
  description: "AIの機能を使ったWebサービスです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${NotoSansJP.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
