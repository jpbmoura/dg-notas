"use client";
import { Roboto } from "next/font/google";

import "./globals.css";
import { useThemeStore } from "@/store/theme-store";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDark } = useThemeStore();
  return (
    <html lang="en">
      <body className={`${roboto.className} ${isDark && "dark "} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
