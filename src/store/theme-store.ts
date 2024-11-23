import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  isDark: false,
  setIsDark: (value) =>
    set(() => {
      window.localStorage.setItem("isdark", JSON.stringify(value));
      return { isDark: value };
    }),
}));
