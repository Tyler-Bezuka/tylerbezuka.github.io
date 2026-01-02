import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsPreview />
      <ContactCTA />
    </>
  );
}
