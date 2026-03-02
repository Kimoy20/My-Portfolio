"use client";

import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";

interface CodeSnippetProps {
  language: string;
  code: string;
  description: string;
}

export function CodeSnippet({ language, code, description }: CodeSnippetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      typescript: "bg-blue-500",
      javascript: "bg-yellow-500",
      python: "bg-green-500",
      java: "bg-red-500",
      csharp: "bg-purple-500",
      default: "bg-gray-500",
    };
    return colors[lang.toLowerCase()] || colors.default;
  };

  const highlightCode = (code: string) => {
    // Simple syntax highlighting for common patterns
    const highlighted = code
      // Keywords
      .replace(
        /\b(const|let|var|function|return|if|else|try|catch|export|import|from|class|interface|type|async|await|new|this)\b/g,
        '<span class="text-purple-400 font-semibold">$1</span>',
      )
      // Strings
      .replace(
        /(["'`])([^"'`]*)\1/g,
        '<span class="text-green-400">$1$2$1</span>',
      )
      // Comments
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-blue-400">$1</span>')
      // Function calls
      .replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\(/g,
        '<span class="text-yellow-400">$1</span>(',
      )
      // TypeScript types
      .replace(
        /:\s*([A-Z][a-zA-Z0-9_]*)/g,
        ': <span class="text-cyan-400">$1</span>',
      );

    return highlighted;
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group inline-flex items-center gap-2 rounded-lg border border-border/40 bg-surface/50 px-3 py-2 text-sm font-medium text-foreground/90 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-surface/70 hover:scale-105 w-full sm:w-auto"
      >
        <Code2 className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">
          {isExpanded ? "Hide Code" : "View Code Snippet"}
        </span>
        <svg
          className={`h-4 w-4 transition-transform flex-shrink-0 ml-auto ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-3 animate-in slide-in-from-top-2 duration-300">
          <div className="relative rounded-lg border border-border/40 bg-surface/30 backdrop-blur-sm max-w-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/20 px-3 py-2 sm:px-4">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className={`h-3 w-3 rounded-full ${getLanguageColor(language)} flex-shrink-0`}
                />
                <span className="text-xs font-medium text-muted/80 truncate">
                  {language}
                </span>
                <span className="text-xs text-muted/60 flex-shrink-0">•</span>
                <span className="text-xs text-muted/80 hidden sm:inline truncate">
                  {description}
                </span>
                <span className="text-xs text-muted/80 sm:hidden truncate">
                  {description.length > 20
                    ? description.substring(0, 20) + "..."
                    : description}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="group relative inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted/80 transition-colors hover:text-foreground hover:bg-surface/50 flex-shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="hidden sm:inline text-green-500">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code content */}
            <div className="overflow-x-auto max-w-full">
              <pre className="p-3 sm:p-4 text-xs sm:text-sm leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(code),
                  }}
                  className="font-mono text-foreground/90 break-words whitespace-pre-wrap break-all"
                />
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
