"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="dark-mode-toggle relative flex items-center justify-center size-11 rounded-full bg-transparent hover:bg-[var(--accent)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2 cursor-pointer"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="relative size-5">
        <Sun
          className={`sun-icon absolute inset-0 size-5 text-[var(--foreground-muted)] transition-all duration-200 ease-in-out motion-reduce:transition-none ${
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`moon-icon absolute inset-0 size-5 text-[var(--foreground-muted)] transition-all duration-200 ease-in-out motion-reduce:transition-none ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </span>
    </button>
  );
}
