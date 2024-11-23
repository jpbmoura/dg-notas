"use client";
import { Roboto } from "next/font/google";

import "./globals.css";
import { useThemeStore } from "@/store/theme-store";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDark, setIsDark } = useThemeStore();

  useEffect(() => {
    let darkMode = window.localStorage.getItem("isdark");
    if (darkMode === null) {
      darkMode = JSON.stringify(
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    setIsDark(JSON.parse(darkMode));
  }, [setIsDark]);

  return (
    <html lang="en">
      <body className={`${roboto.className} ${isDark && "dark "} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
