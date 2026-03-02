"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronDown, Palette, Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

const colorThemes: ColorTheme[] = [
  {
    name: "Ocean Breeze",
    primary: "#0EA5E9",
    secondary: "#0284C7",
    accent: "#06B6D4",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    muted: "#94A3B8",
  },
  {
    name: "Forest Dream",
    primary: "#10B981",
    secondary: "#059669",
    accent: "#34D399",
    background: "#052E16",
    surface: "#14532D",
    text: "#F0FDF4",
    muted: "#86EFAC",
  },
  {
    name: "Sunset Glow",
    primary: "#F59E0B",
    secondary: "#D97706",
    accent: "#FBBF24",
    background: "#431407",
    surface: "#7C2D12",
    text: "#FFFBEB",
    muted: "#FED7AA",
  },
  {
    name: "Royal Purple",
    primary: "#8B5CF6",
    secondary: "#7C3AED",
    accent: "#A78BFA",
    background: "#2E1065",
    surface: "#4C1D95",
    text: "#F3E8FF",
    muted: "#C4B5FD",
  },
  {
    name: "Cherry Blossom",
    primary: "#EC4899",
    secondary: "#DB2777",
    accent: "#F472B6",
    background: "#500724",
    surface: "#831843",
    text: "#FDF2F8",
    muted: "#FBCFE8",
  },
];

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const t = document.documentElement.dataset.theme;
  return t === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const applyColorThemeDOM = useCallback((colorTheme: ColorTheme) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", colorTheme.primary);
    root.style.setProperty("--secondary", colorTheme.secondary);
    root.style.setProperty("--accent", colorTheme.accent);
    root.style.setProperty("--background", colorTheme.background);
    root.style.setProperty("--surface", colorTheme.surface);
    root.style.setProperty("--text", colorTheme.text);
    root.style.setProperty("--muted", colorTheme.muted);
  }, []);

  const applyColorTheme = useCallback(
    (colorTheme: ColorTheme, closeDropdown = true) => {
      applyColorThemeDOM(colorTheme);

      // Store in localStorage
      try {
        localStorage.setItem("colorTheme", JSON.stringify(colorTheme));
      } catch {
        // ignore
      }

      // Only close dropdown if it's not the initial mount
      if (closeDropdown && !isInitialMount.current) {
        setIsOpen(false);
      }
    },
    [applyColorThemeDOM],
  );

  const resetToDefault = () => {
    const root = document.documentElement;
    root.style.removeProperty("--primary");
    root.style.removeProperty("--secondary");
    root.style.removeProperty("--accent");
    root.style.removeProperty("--background");
    root.style.removeProperty("--surface");
    root.style.removeProperty("--text");
    root.style.removeProperty("--muted");

    try {
      localStorage.removeItem("colorTheme");
    } catch {
      // ignore
    }

    setIsOpen(false);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Load saved color theme on mount
  useEffect(() => {
    try {
      const savedColorTheme = localStorage.getItem("colorTheme");
      if (savedColorTheme) {
        const colorTheme = JSON.parse(savedColorTheme) as ColorTheme;
        applyColorThemeDOM(colorTheme);
      }
    } catch {
      // ignore
    }

    // Mark initial mount as complete
    isInitialMount.current = false;
  }, [applyColorThemeDOM]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/50 px-4 py-2 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface/70 hover:scale-105"
        aria-label="Theme options"
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
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </svg>
        </div>
        <span className="hidden sm:inline">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-lg border border-border/40 bg-surface/95 backdrop-blur-md shadow-lg z-50 animate-in slide-in-from-top-2 duration-200 sm:right-0 sm:mt-2">
          <div className="p-4 border-b border-border/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Theme Options
              </h3>
              <button
                onClick={() => setTheme(nextTheme)}
                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-muted/80 hover:text-foreground hover:bg-surface/50 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-3 w-3" />
                ) : (
                  <Moon className="h-3 w-3" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            <button
              onClick={resetToDefault}
              className="w-full text-left text-xs text-muted/80 hover:text-foreground transition-colors"
            >
              Reset to Default Colors
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            <div className="p-2">
              <h4 className="text-xs font-medium text-muted/80 mb-2 px-2">
                Color Themes
              </h4>
              {colorThemes.map((colorTheme) => (
                <button
                  key={colorTheme.name}
                  onClick={() => applyColorTheme(colorTheme)}
                  className="w-full group/item rounded-lg p-3 hover:bg-surface/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground group-hover/item:text-accent transition-colors">
                      {colorTheme.name}
                    </span>
                    <Palette className="h-3 w-3 text-muted/60 group-hover/item:text-accent transition-colors" />
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-4 w-4 rounded-sm border border-border/20"
                      style={{ backgroundColor: colorTheme.primary }}
                      title="Primary"
                    />
                    <div
                      className="h-4 w-4 rounded-sm border border-border/20"
                      style={{ backgroundColor: colorTheme.secondary }}
                      title="Secondary"
                    />
                    <div
                      className="h-4 w-4 rounded-sm border border-border/20"
                      style={{ backgroundColor: colorTheme.accent }}
                      title="Accent"
                    />
                    <div
                      className="h-4 w-4 rounded-sm border border-border/20"
                      style={{ backgroundColor: colorTheme.background }}
                      title="Background"
                    />
                    <div
                      className="h-4 w-4 rounded-sm border border-border/20"
                      style={{ backgroundColor: colorTheme.surface }}
                      title="Surface"
                    />
                    <div
                      className="h-4 w-4 rounded-sm border border-border/20"
                      style={{ backgroundColor: colorTheme.text }}
                      title="Text"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
