"use client";

const navItems = [
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * 同一ページ内の移動。
 * hash リンクと scrollIntoView は Next.js / iPad Safari で先頭に戻ることがあるため、
 * 文書座標を計算して window.scrollTo する。
 */
export function NavLinks({ className }: { className: string }) {
  function goTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    // iPad/SP の上部 sticky ヘッダーのぶんだけずらす。
    // PC の左固定カラム(position: fixed)は上部を覆わないので対象外。
    const header = document.querySelector("header");
    const offset =
      header instanceof HTMLElement &&
      getComputedStyle(header).position === "sticky"
        ? header.offsetHeight
        : 0;

    const top =
      target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  }

  return (
    <ul className={className}>
      {navItems.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => goTo(item.id)}
            className="cursor-pointer border-0 bg-transparent p-0 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
