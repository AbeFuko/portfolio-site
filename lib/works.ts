/**
 * 実績データ。
 * 実案件を追加するときはこの配列に1件足すだけで Works セクションに反映される。
 * 画像は public/works/ に 1600x1000 目安で置く。
 */
export type Work = {
  /** URL・画像ファイル名に使う識別子 */
  slug: string;
  title: string;
  /** client: 受託実績 / demo: 自主制作・デモ。正直にラベル分けする */
  type: "client" | "demo";
  year: string;
  /** 1〜2文。何のサイトで、何をしたか */
  description: string;
  /** 自分の担当範囲。例: "実装(HTML/CSS/JavaScript)" */
  role: string;
  /** デザイン等のクレジット。デザインありきの立場を示す重要情報 */
  credits?: { label: string; name: string }[];
  /** 公開URL(あれば) */
  url?: string;
  /** public/ からのパス */
  image: string;
  tags: string[];
};

export const works: Work[] = [
  // TODO: 公開許可のある実案件に差し替える(1〜2件)
  {
    slug: "sample-client-site",
    title: "(実案件のタイトルに差し替え)",
    type: "client",
    year: "2026",
    description:
      "ここに案件の説明を1〜2文で。例: ブランドサイトの実装を担当。Figmaデータをもとにレスポンシブ対応・アニメーションを含めてコーディングしました。",
    role: "実装(コーディング)",
    credits: [{ label: "Design", name: "(デザイナー名・敬称付き)" }],
    url: undefined,
    image: "/works/sample-client-site.png",
    tags: ["HTML/CSS", "JavaScript"],
  },
  {
    slug: "portfolio-site",
    title: "本サイト(ポートフォリオ)",
    type: "demo",
    year: "2026",
    description:
      "このサイト自体も自分で設計・実装しています。Next.js の静的生成で構築し、表示速度とマークアップの品質を重視しました。",
    role: "設計・実装",
    image: "/works/portfolio-site.png",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
];
