"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Render a placeholder during SSR / before hydration to avoid layout shift
  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="icon-only w-9 h-9 rounded-full border border-white/10 hover:border-gold-400/30 flex items-center justify-center transition-colors duration-300 text-gray-300 hover:text-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}
