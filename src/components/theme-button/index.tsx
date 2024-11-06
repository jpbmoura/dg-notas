"use client";
import React from "react";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme-store";

export const ThemeButton = () => {
  const { isDark, setIsDark } = useThemeStore();

  return (
    <Switch
      checkedIcon={<Moon />}
      uncheckedIcon={<Sun />}
      onCheckedChange={(e) => setIsDark(e)}
      checked={isDark}
      className=""
    />
  );
};
