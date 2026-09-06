import { WorksSection } from "@/components/features/WorksSection";
import { AboutSection } from "@/components/features/AboutSection";
import { ContactSection } from "@/components/features/ContactSection";

export default function Home() {
  // ヒーローは置かない。開いた瞬間に作品が見える構成にする
  return (
    <>
      <WorksSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
