import { WorkBrowserFrame } from "@/components/features/WorkBrowserFrame";
import type { Work } from "@/lib/works";

export function ResponsiveWorkShowcase({ work }: { work: Work }) {
  const { desktop, tablet, mobile } = work.screens;

  if (!tablet || !mobile) {
    return (
      <WorkBrowserFrame
        image={desktop}
        viewport="desktop"
        title={work.title}
      />
    );
  }

  return (
    <div className="relative pb-32 md:pr-24 md:pb-24">
      <WorkBrowserFrame
        image={desktop}
        viewport="desktop"
        title={work.title}
      />

      <div className="absolute right-16 bottom-0 w-48 sm:w-64 md:right-24 md:w-72">
        <WorkBrowserFrame
          image={tablet}
          viewport="tablet"
          title={work.title}
        />
      </div>

      <div className="absolute right-0 bottom-0 w-24 sm:w-32 md:w-36">
        <WorkBrowserFrame
          image={mobile}
          viewport="mobile"
          title={work.title}
        />
      </div>
    </div>
  );
}
