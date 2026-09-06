import { ArrowUpRight } from "lucide-react";
import { works, type Work } from "@/lib/works";
import { FadeIn } from "@/components/ui/FadeIn";
import { WorkPreview } from "@/components/features/WorkPreview";

const typeLabels: Record<Work["type"], string> = {
  client: "Client Work",
  demo: "Demo / 自主制作",
};

function WorkItem({ work, preload }: { work: Work; preload: boolean }) {
  const preview = (
    <WorkPreview
      src={work.image}
      alt={`${work.title} のスクリーンショット`}
      address={work.address}
      width={work.imageWidth}
      height={work.imageHeight}
      preload={preload}
    />
  );

  return (
    <FadeIn>
      <article className="group">
        {work.url ? (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-preview-trigger block"
          >
            {preview}
          </a>
        ) : (
          <div className="work-preview-trigger">{preview}</div>
        )}

        <div className="mt-4">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {typeLabels[work.type]} — {work.year}
          </p>
          <h3 className="mt-4 text-lg font-medium tracking-tight">
            {work.url ? (
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-opacity hover:opacity-70"
              >
                {work.title}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            ) : (
              work.title
            )}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-loose text-muted-foreground">
            {work.description}
          </p>

          {/* 担当範囲とクレジット: デザインありきの立場を正直に示す */}
          <dl className="mt-4 flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            <div className="flex gap-4">
              <dt className="shrink-0">担当</dt>
              <dd>{work.role}</dd>
            </div>
            {work.credits?.map((credit) => (
              <div key={credit.label} className="flex gap-4">
                <dt className="shrink-0">{credit.label}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
            <div className="flex gap-4">
              <dt className="sr-only">使用技術</dt>
              <dd>{work.tags.join(" / ")}</dd>
            </div>
          </dl>
        </div>
      </article>
    </FadeIn>
  );
}

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
