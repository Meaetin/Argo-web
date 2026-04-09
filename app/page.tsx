import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { AppPreview } from "@/components/AppPreview";
import { WaitlistCTA } from "@/components/WaitlistCTA";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export default function HomePage() {
  return (
    <main className="home-page">
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <AppPreview />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
