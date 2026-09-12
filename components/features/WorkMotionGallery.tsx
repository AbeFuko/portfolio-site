import type { WorkMotion } from "@/lib/works";

export function WorkMotionGallery({ items }: { items: WorkMotion[] }) {
  return (
    <section className="mt-16 border-t pt-16" aria-labelledby="motion-heading">
      <h2
        id="motion-heading"
        className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
      >
        Motion
      </h2>
      <div className="mt-8 space-y-6">
        {items.map((item) => (
          <figure key={item.src}>
            <video
              controls
              playsInline
              preload="none"
              poster={item.poster}
              className="w-full bg-muted"
            >
              <source src={item.src} type={item.type} />
              お使いのブラウザは動画を再生できません。
            </video>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
