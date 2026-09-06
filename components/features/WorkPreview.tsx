"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** 枠より明らかに縦長ならスクロールプレビューにする */
const SCROLL_ASPECT_THRESHOLD = 0.8;

export type PreviewVariant = "desktop" | "tablet" | "mobile";

const variantLabels: Record<PreviewVariant, string> = {
  desktop: "デスクトップ表示",
  tablet: "タブレット表示",
  mobile: "スマートフォン表示",
};

const variantAspect: Record<PreviewVariant, string> = {
  desktop: "aspect-video",
  tablet: "work-preview-tablet",
  mobile: "work-preview-mobile",
};

const variantSizes: Record<PreviewVariant, string> = {
  desktop: "(min-width: 1280px) 48rem, 100vw",
  tablet: "(min-width: 768px) 16rem, 50vw",
  mobile: "(min-width: 768px) 8rem, 6rem",
};

type WorkPreviewProps = {
  src: string;
  alt: string;
  address: string;
  width: number;
  height: number;
  variant?: PreviewVariant;
  preload?: boolean;
};

/**
 * ブラウザ枠つきの作例プレビュー。
 * 縦長のフルページ静止画は、ポインタが乗っているあいだ(タッチ端末では画面内に入っているあいだ)
 * CSS transform でページをなぞるように見せる。動画は使わない。
 */
export function WorkPreview({
  src,
  alt,
  address,
  width,
  height,
  variant = "desktop",
  preload = false,
}: WorkPreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const canScroll = height / width > SCROLL_ASPECT_THRESHOLD;
  const durationSec = Math.min(20, Math.max(8, (height / width) * 4));
  const compact = variant !== "desktop";

  useEffect(() => {
    if (!canScroll) return;
    const node = viewportRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [canScroll]);

  return (
    <figure className="work-preview-trigger overflow-hidden rounded-lg border bg-background">
      <figcaption className="sr-only">{variantLabels[variant]}</figcaption>
      <div
        className={cn(
          "flex items-center border-b",
          compact ? "gap-2 px-2 py-1" : "gap-4 px-4 py-2",
        )}
      >
        <div
          className={cn("flex gap-1", variant === "mobile" && "mx-auto")}
          aria-hidden="true"
        >
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        {variant !== "mobile" && (
          <p
            className={cn(
              "min-w-0 flex-1 truncate rounded-md bg-muted text-xs text-muted-foreground",
              compact ? "px-2 py-1" : "px-4 py-1",
            )}
          >
            {address}
          </p>
        )}
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "work-preview overflow-hidden bg-muted",
          variantAspect[variant],
          canScroll && inView && "is-in-view",
        )}
        style={
          canScroll
            ? ({ "--preview-duration": `${durationSec}s` } as CSSProperties)
            : undefined
        }
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          preload={preload}
          sizes={variantSizes[variant]}
          className={cn(
            "h-auto w-full",
            canScroll ? "work-preview-image" : "object-cover object-top",
          )}
        />
      </div>
    </figure>
  );
}
