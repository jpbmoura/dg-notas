import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  isDark: false,
  setIsDark: (value) =>
    set(() => ({
      isDark: value,
    })),
}));
