"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  variant?: "hero" | "cta";
}

export function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate async — wire to Resend / Supabase later
    setTimeout(() => {
      localStorage.setItem("argo_waitlist_email", email);
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "waitlist-success flex items-center gap-3 rounded-2xl px-5 py-4",
          variant === "hero"
            ? "bg-[var(--card)] border border-[var(--border)]"
            : "bg-white/10 border border-white/20"
        )}
      >
        <CheckCircle
          className={cn(
            "size-5 shrink-0",
            variant === "hero" ? "text-[var(--brand)]" : "text-amber-400"
          )}
        />
        <p
          className={cn(
            "text-sm font-light",
            variant === "hero" ? "text-[var(--foreground-muted)]" : "text-white/90"
          )}
        >
          You&apos;re on the list! We&apos;ll reach out when early access opens.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="waitlist-form flex flex-col sm:flex-row gap-3"
      noValidate
    >
      <div className="waitlist-input-wrapper flex-1 min-w-0">
        <label htmlFor={`email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${variant}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="your@email.com"
          className={cn(
            "waitlist-input w-full rounded-full px-5 py-3 text-sm outline-none transition-all duration-200",
            variant === "hero"
              ? "bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--halo)]"
              : "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20",
            error && "border-red-400"
          )}
          aria-describedby={error ? `email-error-${variant}` : undefined}
          disabled={loading}
        />
        {error && (
          <p
            id={`email-error-${variant}`}
            className="waitlist-error mt-1.5 text-xs text-red-500"
          >
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="waitlist-submit cursor-pointer flex items-center justify-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] disabled:opacity-70 text-white text-sm font-light tracking-[0.1em] px-6 py-3 rounded-full transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
      >
        {loading ? (
          <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : (
          <>
            Get Early Access
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
