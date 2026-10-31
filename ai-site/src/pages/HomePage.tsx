import { ContactSection } from '@/components/sections/ContactSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { FounderSection } from '@/components/sections/FounderSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { Hero } from '@/components/sections/Hero';
import { JourneySection } from '@/components/sections/JourneySection';
import { MissionSection } from '@/components/sections/MissionSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TrainingSection } from '@/components/sections/TrainingSection';
import { WorkshopsSection } from '@/components/sections/WorkshopsSection';
import { site } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function HomePage() {
  useDocumentTitle(`${site.brand.name} — Practical AI Education & Training`);

  return (
    <>
      <Hero />
      <MissionSection />
      <TrainingSection />
      <WorkshopsSection />
      <DemoSection />
      <ProductsSection />
      <ProjectsSection />
      <FounderSection />
      <JourneySection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
