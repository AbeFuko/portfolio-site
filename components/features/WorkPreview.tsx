"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** 枠(16:9)より明らかに縦長ならスクロールプレビューにする */
const SCROLL_ASPECT_THRESHOLD = 0.8;

type WorkPreviewProps = {
  src: string;
  alt: string;
  address: string;
  width: number;
  height: number;
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
  preload = false,
}: WorkPreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const canScroll = height / width > SCROLL_ASPECT_THRESHOLD;
  const durationSec = Math.min(20, Math.max(8, (height / width) * 4));

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
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex items-center gap-4 border-b px-4 py-2">
        <div className="flex gap-1" aria-hidden="true">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
        </div>
        <p className="min-w-0 flex-1 truncate rounded-md bg-muted px-4 py-1 text-xs text-muted-foreground">
          {address}
        </p>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "work-preview aspect-video overflow-hidden bg-muted",
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
          sizes="(min-width: 1280px) 72rem, 100vw"
          className={cn(
            "h-auto w-full",
            canScroll
              ? "work-preview-image"
              : "object-cover object-top",
          )}
        />
      </div>
    </div>
  );
}
