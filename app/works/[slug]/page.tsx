import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ResponsiveWorkShowcase } from "@/components/features/ResponsiveWorkShowcase";
import { WorkMotionGallery } from "@/components/features/WorkMotionGallery";
import { getWork, works, workTypeLabels } from "@/lib/works";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) return {};

  return {
    title: `${work.title} | 武藤楓子`,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) notFound();

  return (
    <article className="py-24 lg:py-32">
      <Link
        href="/#works"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Works
      </Link>

      <header className="mt-8">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          {workTypeLabels[work.type]} — {work.year}
        </p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight">
          {work.title}
        </h1>
      </header>

      <section className="mt-16" aria-label="レスポンシブ表示">
        <ResponsiveWorkShowcase work={work} />
      </section>

      <section className="mt-16 border-t pt-16" aria-labelledby="about-heading">
        <h2
          id="about-heading"
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
        >
          About this work
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-loose text-muted-foreground">
          {work.description}
        </p>

        <dl className="mt-8 flex max-w-xl flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
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

        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1 text-sm underline underline-offset-8 transition-opacity hover:opacity-70"
          >
            サイトを見る
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        )}
      </section>

      {work.motion && <WorkMotionGallery items={work.motion} />}
    </article>
  );
}
