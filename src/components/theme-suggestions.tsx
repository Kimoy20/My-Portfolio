"use client";

import { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";

interface ThemeCombination {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  description: string;
}

const themeCombinations: ThemeCombination[] = [
  {
    name: "Ocean Breeze",
    primary: "#0EA5E9",
    secondary: "#0284C7", 
    accent: "#06B6D4",
    background: "#0F172A",
    surface: "#1E293B",
    text: "#F8FAFC",
    muted: "#94A3B8",
    description: "Cool blues with deep ocean vibes"
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
    description: "Natural greens inspired by nature"
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
    description: "Warm oranges and golden hour"
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
    description: "Elegant purples with royal feel"
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
    description: "Soft pinks with spring vibes"
  }
];

export function ThemeSuggestions() {
  const [copiedTheme, setCopiedTheme] = useState<string | null>(null);

  const copyThemeColors = async (theme: ThemeCombination) => {
    const cssVariables = `:root {
  --primary: ${theme.primary};
  --secondary: ${theme.secondary};
  --accent: ${theme.accent};
  --background: ${theme.background};
  --surface: ${theme.surface};
  --text: ${theme.text};
  --muted: ${theme.muted};
}`;

    try {
      await navigator.clipboard.writeText(cssVariables);
      setCopiedTheme(theme.name);
      setTimeout(() => setCopiedTheme(null), 2000);
    } catch (err) {
      console.error("Failed to copy theme:", err);
    }
  };

  const applyThemePreview = (theme: ThemeCombination) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--surface', theme.surface);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--muted', theme.muted);
  };

  return (
    <div className="group relative rounded-2xl border border-border/40 bg-gradient-to-br from-surface/50 to-surface/30 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Theme Suggestions
            </h3>
            <p className="text-sm text-muted/80">
              5 curated color combinations
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {themeCombinations.map((theme) => (
            <div
              key={theme.name}
              className="group/item rounded-lg border border-border/30 bg-surface/20 p-4 transition-all hover:border-accent/50 hover:bg-surface/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {theme.name}
                  </h4>
                  <p className="text-xs text-muted/80 mt-1">
                    {theme.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => applyThemePreview(theme)}
                    className="group/btn relative inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted/80 transition-colors hover:text-foreground hover:bg-surface/50"
                    title="Preview theme"
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Preview</span>
                  </button>
                  <button
                    onClick={() => copyThemeColors(theme)}
                    className="group/btn relative inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted/80 transition-colors hover:text-foreground hover:bg-surface/50"
                  >
                    {copiedTheme === theme.name ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="hidden sm:inline text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Color Palette Display */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1 grid grid-cols-7 gap-1">
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.primary }}
                    title="Primary"
                  />
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.accent }}
                    title="Accent"
                  />
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.background }}
                    title="Background"
                  />
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.surface }}
                    title="Surface"
                  />
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.text }}
                    title="Text"
                  />
                  <div
                    className="h-8 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.muted }}
                    title="Muted"
                  />
                </div>
              </div>

              {/* Color Values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span className="text-muted/80 font-mono">{theme.primary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <span className="text-muted/80 font-mono">{theme.secondary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span className="text-muted/80 font-mono">{theme.accent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-sm border border-border/20"
                    style={{ backgroundColor: theme.background }}
                  />
                  <span className="text-muted/80 font-mono">{theme.background}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 rounded-lg bg-surface/30 border border-border/20">
          <p className="text-xs text-muted/80">
            💡 <strong>Tip:</strong> Click "Preview" to see the theme live, or "Copy" to get CSS variables for your project.
          </p>
        </div>
      </div>
    </div>
  );
}
