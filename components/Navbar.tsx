"use client";

import { useEffect, useState } from "react";
import { DarkModeToggle } from "./DarkModeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/80 backdrop-blur-[20px] border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="navbar-inner max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
        <div className="navbar-logo flex items-center gap-2">
          <div className="navbar-logo-mark size-7 rounded-md bg-amber-500 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M8 1.5L13.5 5V11L8 14.5L2.5 11V5L8 1.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="navbar-wordmark text-base font-extralight tracking-[0.2em] text-[var(--foreground)] uppercase">
            Argo
          </span>
        </div>

        <div className="navbar-controls flex items-center gap-3">
          <DarkModeToggle />
          <a
            href="#waitlist"
            className="navbar-cta bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-foreground)] font-light text-xs tracking-[0.15em] px-6 py-2.5 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
