"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative inline-flex h-7 w-14 items-center rounded-full border border-border bg-surface-2 transition-colors hover:border-steel"
    >
      <span
        className={`pointer-events-none absolute left-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-steel text-[10px] font-mono uppercase tracking-widest text-background transition-transform duration-500 ${
          theme === "light" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? "D" : "L"}
      </span>
      <span className="sr-only">{theme} mode</span>
    </button>
  );
}
