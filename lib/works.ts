/** public/ から参照する画像 */
export type WorkImage = {
  src: string;
  width: number;
  height: number;
};

/** 動き自体を見せたい案件だけ追加する動画 */
export type WorkMotion = {
  src: string;
  type: "video/webm" | "video/mp4";
  poster: string;
  title: string;
};

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
  /** 一覧に表示する、枠なしのPCトップ画像 */
  cover: WorkImage;
  /** 詳細ページのブラウザ枠に表示する各レスポンシブ画像 */
  screens: {
    desktop: WorkImage;
    tablet?: WorkImage;
    mobile?: WorkImage;
  };
  /** 任意。ページ内の動きや操作感を紹介する手動再生動画 */
  motion?: WorkMotion[];
  tags: string[];
};

export const workTypeLabels: Record<Work["type"], string> = {
  client: "Client Work",
  demo: "Demo / 自主制作",
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
    cover: {
      src: "/works/sample-client-site.png",
      width: 1600,
      height: 1000,
    },
    screens: {
      desktop: {
        src: "/works/sample-client-site.png",
        width: 1600,
        height: 1000,
      },
    },
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
    cover: {
      src: "/works/portfolio-site-cover.webp",
      width: 1600,
      height: 1000,
    },
    screens: {
      desktop: {
        src: "/works/portfolio-site.webp",
        width: 1600,
        height: 3701,
      },
      tablet: {
        src: "/works/portfolio-site-tablet.webp",
        width: 768,
        height: 3169,
      },
      mobile: {
        src: "/works/portfolio-site-mobile.webp",
        width: 390,
        height: 3057,
      },
    },
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
