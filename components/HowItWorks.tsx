import { Link, Sparkles, Map } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Paste any link",
    description:
      "Share a TikTok, YouTube video, Instagram post, or any travel blog. Argo handles the rest.",
    color: "bg-blue-500",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI extracts the details",
    description:
      "Our AI reads every location mentioned — hidden gems, restaurants, viewpoints — and enriches them with real maps data.",
    color: "bg-amber-500",
  },
  {
    number: "03",
    icon: Map,
    title: "Plan your trip",
    description:
      "Organize locations into collections, then generate an optimized day-by-day itinerary with a single click.",
    color: "bg-teal-500",
  },
];

export function HowItWorks() {
  return (
    <section className="how-it-works-section bg-[var(--section-inverted-bg)] py-32 lg:py-48">
      <div className="how-it-works-inner max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="how-it-works-header text-center mb-16 flex flex-col items-center gap-4">
            <p className="how-it-works-label text-xs font-extralight tracking-[0.3em] uppercase text-[var(--brand)]">
              How it works
            </p>
            <h2 className="how-it-works-title text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.02em] text-white max-w-xl">
              From inspiration to itinerary in minutes
            </h2>
            <p className="how-it-works-subtitle text-base text-white/70 max-w-lg leading-relaxed">
              No more copying location names into notes apps. No more lost
              bookmarks. Just paste and plan.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="how-it-works-steps grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={index}>
                <div className="how-it-works-step flex flex-col gap-5">
                  <div className="step-header flex items-center gap-4">
                    <div
                      className={`step-icon-wrap ${step.color} size-11 rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <Icon className="size-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="step-number text-5xl font-extralight text-white/25 tracking-tight tabular-nums">
                      {step.number}
                    </span>
                  </div>

                  <div className="step-content flex flex-col gap-2">
                    <h3 className="step-title text-2xl font-normal text-white tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="step-description text-base leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Preview mockup */}
        <ScrollReveal>
          <div className="how-it-works-preview rounded-3xl overflow-hidden border border-white/10">
            <ImagePlaceholder
              label="App Preview — How It Works Flow"
              aspectRatio="21/9"
              src="/step-preview.png"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
