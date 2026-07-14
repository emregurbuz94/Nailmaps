import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NailMaps — Yakınındaki tırnak salonları",
  description:
    "NailMaps: yakınındaki tırnak salonlarını haritada keşfet, fiyatları karşılaştır, randevunu al.",
  appleWebApp: {
    capable: true,
    title: "NailMaps",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#93314C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
