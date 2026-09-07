"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { workTypeLabels, type Work } from "@/lib/works";
import { FadeIn } from "@/components/ui/FadeIn";
import { WorkModal } from "@/components/features/WorkModal";

export function WorkItem({
  work,
  preload,
}: {
  work: Work;
  preload: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn>
      <article>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="group relative block w-full cursor-pointer overflow-hidden bg-muted text-left"
        >
          <Image
            src={work.cover.src}
            alt={`${work.title} のトップページ`}
            width={work.cover.width}
            height={work.cover.height}
            preload={preload}
            sizes="(min-width: 1280px) 72rem, 100vw"
            className="h-auto w-full object-cover"
          />
          <span className="absolute right-4 bottom-4 bg-background/80 px-4 py-2 text-xs tracking-widest uppercase">
            more
          </span>
        </button>

        <div className="mt-4">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {workTypeLabels[work.type]} — {work.year}
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
      {open && <WorkModal work={work} onClose={() => setOpen(false)} />}
    </FadeIn>
  );
}
