import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "武藤楓子 | Web Developer",
  description:
    "デザイナー・制作会社の実装パートナーとして、Webサイトのコーディングと業務の自動化を請け負っています。武藤楓子のポートフォリオサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable}`}
    >
      <body className="antialiased">
        {/* 左: 固定カラム(モバイルでは先頭ブロック) / 右: スクロールするコンテンツ */}
        <Sidebar />
        <main id="main" className="px-6 xl:ml-80 xl:px-16">
          {/* 本文の器は広め(max-w-6xl)。読み物のテキスト幅は各セクション内の max-w-xl で確保する */}
          <div className="mx-auto max-w-6xl lg:mx-0">
            {children}
            {/* コピーライトは本文(右カラム)の最下部に置く。SPでもページ最下部に来る */}
            <footer className="border-t py-8">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Fuko Muto
              </p>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
