import { works } from "@/lib/works";
import { WorkItem } from "@/components/features/WorkItem";

export function WorksSection() {
  return (
    <section id="works" aria-label="制作実績" className="py-24 lg:py-32">
      <div className="flex flex-col gap-24">
        {works.map((work, index) => (
          <WorkItem key={work.slug} work={work} preload={index === 0} />
        ))}
      </div>
    </section>
  );
}
