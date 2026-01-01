import { HeroSection } from '@/components/sections/HeroSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ScrollAnimationController } from '@/components/visuals/ScrollAnimationController';

export default function Home() {
  return (
    <div className="relative">
      {/* Background & Visual Animation Layer (fixed, behind content) */}
      <ScrollAnimationController />
      
      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <BenefitsSection />
        <EventsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
}
