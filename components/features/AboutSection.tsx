import { FadeIn } from "@/components/ui/FadeIn";

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

        <div className="mt-4 max-w-xl space-y-6 text-sm leading-loose">
          <p>
            {/* TODO: 経験年数・得意分野など事実ベースで調整 */}
            業務管理システムの開発を長く続けてきたエンジニアです。
            個人事業主として、Webサイト・Webアプリケーションの実装を請け負っています。
          </p>
          <p>
            デザインはできません。そのため、要件とデザインが決まっているお仕事を、
            いただいたデザインを崩さず正確に実装する形でお受けしています。
          </p>
        </div>

        <div className="mt-16 max-w-xl">
          <h3 className="text-sm font-medium">できること</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-loose text-muted-foreground">
            <li>デザインデータ(Figma など)からのWebサイト実装</li>
            <li>Webアプリケーションの設計・開発</li>
            <li>
              業務の自動化・効率化(例: 毎月の請求書作成の自動化、定型作業のツール化)
            </li>
          </ul>
        </div>

        <div className="mt-16 max-w-xl">
          <h3 className="text-sm font-medium">お受けしないこと</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-loose text-muted-foreground">
            <li>デザインの制作(ワイヤーフレーム・ビジュアルデザイン)</li>
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
