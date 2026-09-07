"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  workSlideLabels,
  workTypeLabels,
  type Work,
} from "@/lib/works";
import { WorkPreview } from "@/components/features/WorkPreview";
import { cn } from "@/lib/utils";

type WorkModalProps = {
  work: Work;
  onClose: () => void;
};

export function WorkModal({ work, onClose }: WorkModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const slide = work.slides[index];
  const hasSlider = work.slides.length > 1;

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % work.slides.length);
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) =>
          current === 0 ? work.slides.length - 1 : current - 1,
        );
      }
      if (event.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;
      const nodes = [
        ...root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => !node.hasAttribute("disabled"));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [onClose, work.slides.length]);

  function go(step: number) {
    setIndex((current) => {
      const next = current + step;
      if (next < 0) return work.slides.length - 1;
      if (next >= work.slides.length) return 0;
      return next;
    });
  }

  const frameWidth = {
    desktop: "w-full",
    tablet: "w-64 sm:w-72",
    mobile: "w-40 sm:w-48",
  }[slide.variant];

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="閉じる"
        className="absolute inset-0 bg-foreground/40"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-4 flex flex-col overflow-hidden rounded-lg border bg-background md:inset-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
          <span className="sr-only">閉じる</span>
        </button>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto px-8 py-8 md:px-16">
          {hasSlider && (
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft aria-hidden="true" className="size-8" />
              <span className="sr-only">前の画面</span>
            </button>
          )}

          <div className={cn("min-w-0", frameWidth)}>
            <WorkPreview
              key={slide.variant}
              variant={slide.variant}
              src={slide.src}
              alt={`${work.title} の${workSlideLabels[slide.variant]}表示`}
              address={work.address}
              width={slide.width}
              height={slide.height}
            />
          </div>

          {hasSlider && (
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronRight aria-hidden="true" className="size-8" />
              <span className="sr-only">次の画面</span>
            </button>
          )}
        </div>

        {hasSlider && (
          <ul className="flex justify-center gap-4 pb-4 text-xs tracking-widest uppercase">
            {work.slides.map((item, itemIndex) => (
              <li key={item.variant}>
                <button
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  className={cn(
                    "transition-colors",
                    itemIndex === index
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={itemIndex === index ? "true" : undefined}
                >
                  {workSlideLabels[item.variant]}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="shrink-0 border-t px-6 py-8 md:px-8">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            {workTypeLabels[work.type]} — {work.year}
          </p>
          <h3 id={titleId} className="mt-4 text-lg font-medium tracking-tight">
            {work.title}
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
      </div>
    </div>
  );
}
