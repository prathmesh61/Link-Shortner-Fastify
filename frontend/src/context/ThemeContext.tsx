import React, { createContext, useState } from "react";

interface ThemeContext {
  toggle: () => void;
  mode: "dark" | "light";
}

export const ThemeContext = createContext<ThemeContext>({
  toggle: () => {},
  mode: "dark",
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
