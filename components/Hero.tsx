import { WaitlistForm } from "./WaitlistForm";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { ScrollReveal } from "./ScrollReveal";
import { HeroParticles } from "./HeroParticles";

export function Hero() {
  return (
    <section className="hero-section relative min-h-screen flex items-center pt-16 overflow-hidden bg-[var(--background)]">
      {/* Particle canvas */}
      <HeroParticles />

      {/* Light rays */}
      <div
        className="hero-light-rays pointer-events-none absolute top-[-20%] right-[-10%] w-[80%] h-[140%] opacity-40"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(232,180,140,0.05) 20%, rgba(232,180,140,0.1) 40%, transparent 60%)",
          transform: "rotate(-15deg)",
        }}
        aria-hidden="true"
      />

      {/* Curtain overlay */}
      <div
        className="hero-curtain pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--curtain-from) 0%, var(--curtain-mid) 30%, var(--curtain-to) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="hero-inner relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + Form */}
          <div className="hero-content flex flex-col gap-8">
            <ScrollReveal>
              <div className="hero-badge inline-flex items-center gap-2 self-start bg-[var(--accent-warm)] border border-[var(--border)] text-[var(--brand)] text-xs font-extralight px-4 py-2 rounded-full tracking-[0.3em] uppercase">
                <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                Coming Soon
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="hero-disclaimer text-xs text-[var(--foreground-subtle)] font-light italic">
                UI design is in early development — visuals shown are placeholders.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <div className="hero-headline flex flex-col gap-4">
                <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extralight leading-[0.95] tracking-[-0.02em] text-[var(--foreground)]">
                  Your next trip,
                  <br />
                  <span className="hero-title-accent type-secondary italic text-[var(--brand)]">
                    planned by AI.
                  </span>
                </h1>
                <p className="hero-description text-xl md:text-2xl text-[var(--foreground-muted)] font-light leading-relaxed max-w-lg">
                  Paste any link — a TikTok, YouTube video, or travel blog. Argo
                  extracts every location automatically and turns them into
                  day-by-day itineraries.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="hero-form-wrapper max-w-md w-full" id="waitlist">
                <WaitlistForm variant="hero" />
                <p className="hero-form-note mt-3 text-xs text-[var(--foreground-subtle)]">
                  No credit card required. Be the first to try Argo.
                </p>
              </div>
            </ScrollReveal>

            {/* Source icons */}
            <ScrollReveal delay={3}>
              <div className="hero-sources flex flex-col gap-2">
                <p className="hero-sources-label text-xs font-extralight text-[var(--foreground-subtle)] uppercase tracking-[0.3em]">
                  Works with any link from
                </p>
                <div className="hero-source-icons flex items-center gap-3 flex-wrap">
                  {[
                    { label: "TikTok", color: "bg-zinc-900" },
                    { label: "YouTube", color: "bg-red-500" },
                    { label: "Instagram", color: "bg-purple-500" },
                    { label: "Blogs", color: "bg-blue-500" },
                  ].map((source) => (
                    <div
                      key={source.label}
                      className="source-pill flex items-center gap-1.5 bg-[var(--card)] border border-[var(--border)] rounded-full px-3 py-1"
                    >
                      <div
                        className={`source-dot size-2 rounded-full ${source.color}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-light text-[var(--foreground-muted)]">
                        {source.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: App mockup */}
          <ScrollReveal delay={2}>
            <div className="hero-visual relative flex items-center justify-center">
              <div className="hero-mockup-wrapper relative w-full max-w-[520px] mx-auto">
                {/* Glow behind */}
                <div
                  className="hero-mockup-glow absolute inset-8 bg-[var(--halo)] rounded-3xl blur-2xl"
                  aria-hidden="true"
                />
                <div className="hero-mockup relative rounded-3xl overflow-hidden border border-[var(--border)]"
                  style={{ boxShadow: "0 24px 64px -12px var(--mockup-shadow)" }}
                >
                  <ImagePlaceholder
                    label="App Screenshot — Dashboard"
                    aspectRatio="4/3"
                    src="/hero-mockup.png"
                  />
                </div>
                {/* Floating card 1 */}
                <div className="hero-float-card-1 absolute -left-6 bottom-12 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 hidden lg:flex">
                  <div className="size-8 rounded-lg bg-teal-500 flex items-center justify-center shrink-0">
                    <svg
                      className="size-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)]">
                      Itinerary ready
                    </p>
                    <p className="text-xs text-[var(--foreground-subtle)]">Tokyo · 7 days</p>
                  </div>
                </div>
                {/* Floating card 2 */}
                <div className="hero-float-card-2 absolute -right-6 top-12 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg px-4 py-3 hidden lg:flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                    <svg
                      className="size-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      <path d="M14.828 14.828a4 4 0 015.656 0l-4 4a4 4 0 01-5.656-5.656l1.102-1.101" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)]">
                      12 locations found
                    </p>
                    <p className="text-xs text-[var(--foreground-subtle)]">From 1 link</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
