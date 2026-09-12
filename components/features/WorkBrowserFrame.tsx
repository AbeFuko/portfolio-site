import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WorkImage } from "@/lib/works";

type Viewport = "desktop" | "tablet" | "mobile";

const labels: Record<Viewport, string> = {
  desktop: "PC",
  tablet: "iPad",
  mobile: "SP",
};

const viewportClasses: Record<Viewport, string> = {
  desktop: "aspect-video",
  tablet: "work-frame-tablet",
  mobile: "work-frame-mobile",
};

const imageSizes: Record<Viewport, string> = {
  desktop: "(min-width: 1280px) 64rem, 100vw",
  tablet: "(min-width: 768px) 18rem, 12rem",
  mobile: "(min-width: 768px) 9rem, 6rem",
};

export function WorkBrowserFrame({
  image,
  viewport,
  title,
}: {
  image: WorkImage;
  viewport: Viewport;
  title: string;
}) {
  const compact = viewport !== "desktop";

  return (
    <figure className="space-y-2">
      <figcaption className="text-xs tracking-widest text-muted-foreground uppercase">
        {labels[viewport]}
      </figcaption>
      <div className="overflow-hidden rounded-lg border bg-background">
        <div
          className={cn(
            "flex items-center border-b",
            compact ? "gap-2 px-2 py-1" : "gap-4 px-4 py-2",
          )}
        >
          <div className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
          </div>
          {viewport !== "mobile" && (
            <span
              className={cn(
                "min-w-0 flex-1 truncate rounded-md bg-muted py-1 text-xs text-muted-foreground",
                compact ? "px-2" : "px-4",
              )}
            >
              {title}
            </span>
          )}
        </div>
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            viewportClasses[viewport],
          )}
        >
          <Image
            src={image.src}
            alt={`${title}の${labels[viewport]}表示`}
            width={image.width}
            height={image.height}
            sizes={imageSizes[viewport]}
            className="h-auto w-full object-top"
          />
        </div>
      </div>
    </figure>
  );
}
