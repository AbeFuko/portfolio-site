import { FadeIn } from "@/components/ui/FadeIn";
import Image from "next/image";

/**
 * About セクション。カードやアイコンは使わず文章とリストだけで構成する。
 */
export function AboutSection() {
  return (
    <section id="about" className="border-t py-24 lg:py-32">
      <FadeIn>
        <h2 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          About
        </h2>

        <div className="flex items-center">
          {/* 写真 */}
          <div className="flex justify-center mt-8 w-24 h-24 mr-4">
            <Image src="/icon.svg" alt="About" width={96} height={96} className="rounded-full bg-primary/10 p-2 w-24 h-24" />
          </div>
          {/* 自己紹介 */}
          <div className="mt-4 max-w-xl space-y-6 text-sm leading-loose">
            <p>
              神奈川在住。<br />
              業務管理システムの開発を中心に経験してきたエンジニアです。<br />
              現在は個人で、Webサイト・Webアプリケーションの開発や業務の自動化などを行っています。
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-xl">
          <h3 className="text-sm font-medium text-muted-foreground">ーできることー</h3>
          <div className="mt-4 max-w-xl space-y-6 text-sm leading-loose">
            <ul className="list-disc list-inside">
              <li>HTML/CSS・JavaScriptによるサイト実装</li>
              <li>WordPress・Shopifyを用いたサイト構築</li>
              <li>フォームや外部サービスとの連携</li>
              <li>業務の自動化</li>
            </ul>
            <p>「こういうことはできる？」という段階からでも、お気軽にご相談ください。</p>
          </div>
        </div>

        <div className="mt-16 max-w-xl">
          <h3 className="text-sm font-medium text-muted-foreground">ー大切にしていることー</h3>
          <div className="mt-4 max-w-xl space-y-6 text-sm leading-loose">
            <p>デザインの意図をくみ取り、正確に実装します。<br />
            個人だからこその柔軟さを活かして、状況に合わせた進め方をご提案します。<br />
            初めての課題も、一緒に調べ、試しながら解決策を探す相談相手になっていきたいと考えています。</p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
