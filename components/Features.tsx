import {
  Link2,
  MapPin,
  FolderOpen,
  Route,
  SlidersHorizontal,
  Users,
  Wallet,
  Compass,
  Plane,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

type CardVariant = "hero" | "tall" | "wide" | "small";

const features: {
  icon: typeof Link2;
  title: string;
  description: string;
  colSpan: string;
  rowSpan: string;
  variant: CardVariant;
  dark: boolean;
  accent: string;
  accentCard?: boolean;
  accentBg?: string;
}[] = [
  // 1 — col1 row1-2 (1×2)
  {
    icon: Link2,
    title: "Smart Link Analysis",
    description: "Paste any video or blog URL. Argo handles the rest.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    variant: "tall",
    dark: true,
    accent: "#5B7DB1",
  },
  // 2 — col2 row1 (1×1)
  {
    icon: MapPin,
    title: "Location Extraction",
    description: "Automatically extracts and maps key locations.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    variant: "small",
    dark: false,
    accent: "#C27C6B",
    accentCard: true,
    accentBg: "#E8F0FF",
  },
  // 3 — col3 row1 (1×1)
  {
    icon: SlidersHorizontal,
    title: "Personalization",
    description: "Reorder days, swap places, and fine-tune your trip.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    variant: "small",
    dark: false,
    accent: "#D4A05A",
  },
  // 4 — col4 row1-2 (1×2)
  {
    icon: FolderOpen,
    title: "Collections",
    description: "Save and organize places by theme or destination.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    variant: "tall",
    dark: true,
    accent: "#7B6BA0",
  },
  // 5 — col2-3 row2-3 (2×2)
  {
    icon: Route,
    title: "AI Itineraries",
    description: "Generate optimized day-by-day travel plans.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    variant: "hero",
    dark: false,
    accent: "#5A9E8F",
  },
  // 6 — col1 row3-4 (1×2)
  {
    icon: Plane,
    title: "Transit & Flight Tracking",
    description: "Get live updates for flights and trains.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    variant: "tall",
    dark: true,
    accent: "#A89080",
  },
  // 7 — col4 row3 (1×1)
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Plan trips together in a shared workspace.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    variant: "small",
    dark: false,
    accent: "#8B7BB0",
    accentCard: true,
    accentBg: "#F0E8FF",
  },
  // 8 — col2 row4 (1×1)
  {
    icon: Wallet,
    title: "Budget & Bookings",
    description: "Track spending and manage all reservations in one place.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    variant: "small",
    dark: false,
    accent: "#6B9E6B",
  },
  // 9 — col3-4 row4 (2×1)
  {
    icon: Compass,
    title: "Community Trips",
    description: "Explore, save, remix, or share itineraries.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    variant: "wide",
    dark: true,
    accent: "#D4956A",
  },
];

export function Features() {
  return (
    <section className="features-section bg-[var(--background-alt)] py-32 lg:py-48">
      <div className="features-inner max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="features-header flex flex-col items-center text-center gap-4 mb-16">
            <div className="features-label-pill inline-flex items-center gap-2 bg-[var(--accent-warm)] border border-[var(--border)] text-[var(--brand)] text-xs font-extralight px-4 py-2 rounded-full tracking-[0.3em] uppercase">
              Features
            </div>
            <h2
              className="features-title text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-[-0.02em] max-w-xl"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--foreground) 0%, var(--foreground-muted) 50%, #5B7DB1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Turn any link into a trip
            </h2>
            <p className="features-subtitle text-base text-[var(--foreground-subtle)] max-w-lg leading-relaxed font-light">
              Built for the traveler who finds their best trips through videos and
              blogs — not stale listicles.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0}>
          <div className="features-grid grid grid-cols-1 md:grid-cols-4 auto-rows-[160px] gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal
                  key={feature.title}
                  delay={index}
                  className={`${feature.colSpan} ${feature.rowSpan} h-full`}
                >
                  <article
                    className={`feature-card group h-full relative overflow-hidden rounded-2xl border p-6 flex flex-col justify-between transition-all duration-500 ${
                      feature.dark
                        ? "bg-[#F7F3EE] dark:bg-card-dark border-[var(--border)] dark:border-white/[0.06] hover:border-[var(--border-strong)] dark:hover:border-white/[0.12]"
                        : feature.accentCard
                          ? "dark:bg-card border-[var(--border)] hover:border-[var(--border-strong)]"
                          : "bg-[#F7F3EE] dark:bg-card border-[var(--border)] hover:border-[var(--border-strong)]"
                    } hover:shadow-lg`}
                    style={feature.accentCard ? { backgroundColor: feature.accentBg ?? "#E8F0FF" } : undefined}
                  >
                    {/* Accent gradient wash */}
                    <div
                      className={`feature-accent-wash absolute inset-0 pointer-events-none ${
                        feature.dark ? "opacity-[0.18] dark:opacity-[0.14]" : "opacity-[0.18]"
                      }`}
                      style={{
                        background: `radial-gradient(ellipse at 20% 10%, ${feature.accent}, transparent 65%)`,
                      }}
                    />

                    {/* Subtle noise texture */}
                    <div
                      className="feature-noise absolute inset-0 pointer-events-none opacity-[0.025]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    <div className="feature-inner relative flex h-full flex-col justify-end">
                      {/* Content */}
                      <div className="feature-body">
                        <div className="feature-title-row flex items-center gap-2.5">
                          <div
                            className="feature-icon-pill rounded-xl p-2.5 w-fit backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 shrink-0"
                            style={{
                              backgroundColor: `${feature.accent}18`,
                            }}
                          >
                            <Icon
                              className="feature-icon size-5"
                              style={{ color: feature.accent }}
                              aria-hidden="true"
                            />
                          </div>
                          <h3
                            className={`feature-title font-semibold leading-tight tracking-[-0.01em] ${
                              feature.variant === "small"
                                ? "text-sm max-w-[16ch]"
                                : "text-lg max-w-[16ch]"
                            } ${
                              feature.dark
                                ? "text-[var(--foreground)] dark:text-white"
                                : "text-[var(--foreground)]"
                            }`}
                          >
                            {feature.title}
                          </h3>
                        </div>
                        <p
                          className={`feature-description mt-2 max-w-[34ch] text-sm leading-relaxed font-light ${
                            feature.dark
                              ? "text-[var(--foreground-muted)] dark:text-white/60"
                              : "text-[var(--foreground-muted)]"
                          }`}
                        >
                          {feature.description}
                        </p>
                        {feature.variant === "hero" && (
                          <div className="feature-footer mt-5 flex items-center gap-2">
                            <span
                              className="feature-tag rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
                              style={{
                                backgroundColor: `${feature.accent}15`,
                                color: feature.accent,
                              }}
                            >
                              AI-powered
                            </span>
                            <span
                              className="feature-tag rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
                              style={{
                                backgroundColor: `${feature.accent}15`,
                                color: feature.accent,
                              }}
                            >
                              Route-optimized
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
