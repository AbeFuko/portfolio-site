import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { works, workTypeLabels, type Work } from "@/lib/works";
import { FadeIn } from "@/components/ui/FadeIn";

function WorkItem({ work, preload }: { work: Work; preload: boolean }) {
  return (
    <FadeIn>
      <article>
        <Link
          href={`/works/${work.slug}`}
          className="group relative block overflow-hidden bg-muted"
          aria-label={`${work.title} の詳細を見る`}
        >
          <Image
            src={work.cover.src}
            alt={`${work.title} のトップページ`}
            width={work.cover.width}
            height={work.cover.height}
            preload={preload}
            sizes="(min-width: 1280px) 72rem, 100vw"
            className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-1 bg-background/90 px-4 py-2 text-xs tracking-widest uppercase">
            more
            <ArrowRight aria-hidden="true" className="size-3" />
          </span>
        </Link>

        <div className="mt-4">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {workTypeLabels[work.type]} — {work.year}
          </p>
          <h3 className="mt-4 text-lg font-medium tracking-tight">
            <Link
              href={`/works/${work.slug}`}
              className="transition-opacity hover:opacity-70"
            >
              {work.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-loose text-muted-foreground">
            {work.description}
          </p>
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
