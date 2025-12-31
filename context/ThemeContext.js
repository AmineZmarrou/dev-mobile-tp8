import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const ThemeContext = createContext();
const themes = {
  light: {
    background: "#F7F7FB",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    text: "#0F172A",
    textMuted: "#64748B",
    border: "#E2E8F0",
    primary: "#2563EB",
    primaryText: "#FFFFFF",
    danger: "#DC2626",
    overlay: "rgba(15, 23, 42, 0.45)",
    inputBackground: "#FFFFFF",
  },
  dark: {
    background: "#0B0F14",
    surface: "#111827",
    card: "#111827",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
    border: "#1F2937",
    primary: "#60A5FA",
    primaryText: "#0B1220",
    danger: "#F87171",
    overlay: "rgba(2, 6, 23, 0.6)",
    inputBackground: "#0B1220",
  },
};
const STORAGE_KEY = "APP_THEME";
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTheme) {
        setMode(storedTheme);
      }
      setReady(true);
    };
    loadTheme();
  }, []);
  const toggleTheme = async () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    await AsyncStorage.setItem(STORAGE_KEY, newMode);
  };
  if (!ready) return null;
  return (
    <ThemeContext.Provider value={{ mode, theme: themes[mode], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
