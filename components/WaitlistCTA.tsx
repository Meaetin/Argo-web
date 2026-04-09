import { WaitlistForm } from "./WaitlistForm";
import { ScrollReveal } from "./ScrollReveal";

export function WaitlistCTA() {
  return (
    <section
      id="waitlist"
      className="waitlist-cta-section bg-[var(--section-inverted-bg)] py-32 lg:py-48"
    >
      <div className="waitlist-cta-inner max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        <ScrollReveal>
          <div className="waitlist-cta-header flex flex-col items-center gap-4">
            <p className="waitlist-cta-label text-xs font-extralight tracking-[0.3em] uppercase text-[var(--brand)]">
              Early Access
            </p>
            <h2 className="waitlist-cta-title text-4xl md:text-5xl lg:text-7xl font-extralight leading-[1.1] tracking-[-0.02em] text-white">
              Be the first to explore
              <br />
              <span className="type-secondary italic text-amber-400">
                with Argo.
              </span>
            </h2>
            <p className="waitlist-cta-subtitle text-base text-white/50 max-w-md leading-relaxed font-light">
              Join the waitlist and we&apos;ll reach out when early access opens.
              No spam, no pressure — just travel planning made effortless.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="waitlist-cta-form w-full max-w-md">
            <WaitlistForm variant="cta" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
