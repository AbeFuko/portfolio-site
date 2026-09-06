import { ArrowUpRight } from "lucide-react";
import { NavLinks } from "@/components/layout/NavLinks";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/AbeFuko" },
  { label: "X", href: "https://x.com/taidanochameko" },
  { label: "Zenn", href: "https://zenn.dev/famaryllis" },
] as const;

function SocialLinks() {
  return (
    <ul className="flex gap-4">
      {socialLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * PC(xl以上): 左固定カラム。名乗り・紹介・縦ナビ。
 * iPad/SP: 右上にメニューだけのヘッダー。名前は下の紹介ブロックに出す。
 */
export function Sidebar() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background px-6 py-4 xl:fixed xl:inset-y-0 xl:left-0 xl:flex xl:w-80 xl:flex-col xl:justify-between xl:overflow-hidden xl:border-b-0 xl:px-8 xl:py-12 tall:xl:py-24">
        {/* iPad/SP: 名前は出さず、メニューだけを右上に置く */}
        <nav aria-label="メインナビゲーション" className="flex justify-end xl:hidden">
          <NavLinks className="flex gap-4 text-sm sm:gap-8" />
        </nav>

        {/* PC: 上の塊 = 名乗りと紹介 */}
        <div className="hidden xl:block">
          <h1 className="text-xl font-semibold tracking-tight">武藤 楓子</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Fuko Muto — Web Developer
          </p>
          <p className="mt-8 max-w-xs text-sm leading-loose text-muted-foreground">
            個人のWebサイト・Webアプリケーション制作者です。<br />
            HTML/CSS実装からWordPress・Shopifyカスタマイズ、システム連携まで、気軽に相談できるパートナーを目指しています。
          </p>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>

        {/* PC: 下の塊 = ナビ(justify-between で画面下部に付く) */}
        <nav
          aria-label="メインナビゲーション"
          className="hidden shrink-0 xl:block"
        >
          <NavLinks className="flex flex-col text-sm" />
        </nav>
      </header>

      {/* iPad/SP専用。名前・紹介はここだけに出す。
          区切り線を本文セクションと同じ長さにするため px ではなく mx で寄せる */}
      <div className="mx-6 border-b py-8 xl:hidden">
        <h1 className="text-xl font-semibold tracking-tight">武藤 楓子</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Fuko Muto — Web Developer
        </p>
        <p className="mt-8 max-w-xl text-sm leading-loose text-muted-foreground">
          業務管理システムの開発を長く続けてきたエンジニアです。<br />
          デザイナーや小さな制作会社の実装パートナーとして、
          Webサイトのコーディングと業務の自動化を請け負っています。
        </p>
        <div className="mt-8">
          <SocialLinks />
        </div>
      </div>
    </>
  );
}
