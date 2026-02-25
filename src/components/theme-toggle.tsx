"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const t = document.documentElement.dataset.theme;
  return t === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="group relative inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface/70 hover:scale-105"
      aria-label={`Switch to ${nextTheme} mode`}
    >
      <div className="relative h-4 w-4">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br transition-all duration-300 ${
            theme === "dark"
              ? "from-accent to-accent/60"
              : "from-yellow-400 to-orange-400"
          }`}
        />
        <svg
          className={`absolute inset-0 h-4 w-4 text-white transition-all duration-300 ${
            theme === "dark" ? "rotate-0" : "rotate-180"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {theme === "dark" ? (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          ) : (
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </div>
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
      <span className="sm:hidden">Theme</span>
    </button>
  );
}
