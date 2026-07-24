# Gatsby → Astro 移行記録（アーカイブ）

> **このドキュメントは履歴です。** 2026-06 に完了した Gatsby v2 → Astro 6 の刷新について、
> 移行前の状態・設計判断・最終的にどう着地したかを記録している。
> **現状（as-is）を知りたい場合はルートの `ARCHITECTURE.md` を見ること。**

---

## 1. 移行前の状態（2026-06-15 / Gatsby v2）

2020-08 に作成され、最終コミットは 2021-07。Gatsby 2.23 / React 16.12 / TypeScript 3.9 /
Emotion 10 という、メジャー数世代遅れの構成だった。

| 領域 | 移行前 |
|---|---|
| フレームワーク | Gatsby 2.23（`gatsby-config.js` / `gatsby-node.js` の `createPages`） |
| UI | React 16.12 + Emotion 10（CSS-in-JS）、Atomic Design |
| コンテンツ | `gatsby-transformer-remark` + GraphQL + `graphql-codegen` |
| 演出 | react-spring 8 / gsap 3 / `gatsby-plugin-transition-link` |
| 画像 | `gatsby-image` + sharp 系プラグイン |
| ホスティング | GitHub Pages（`.github/workflows/publish.yml` → `gh-pages`、CNAME `tanmen.work`） |
| CI の Node | 14（ローカルは 24 で乖離） |
| テスト | Jest（`useType` フック 1 本のみ） |

移行前に見つかっていた綻び:

1. **GA が旧 UA 計測** — Universal Analytics は 2023 年に計測停止済みで、解析が事実上死んでいた。
2. **i18n が未配線** — `src/i18n/index.ts` は 0 バイト、`ja.json` / `en.json` の参照ゼロのデッドコード。
3. **`pages/index.tsx` の死にクエリ** — `graphql` クエリが export されておらず機能せず、中身も starter の残骸。
4. **CI / ローカルの Node 乖離**（14 vs 24）。
5. `src/templates/` と `src/components/templates/` の名前衝突、`utils/comparetors` のスペルミス。

移行の動機: Gatsby は 2023 年の Netlify 買収後にメンテナンスモードへ移り、
新規 SSG の主流が Astro / Next.js に移っていた。

---

## 2. 移行方針（当時の決定）

| 項目 | 採用 |
|---|---|
| フレームワーク | Astro 6（コンテンツ主体・JS ゼロ送出。演出だけ island） |
| インタラクティブ | React 19 island（`client:*` で局所ハイドレート） |
| スタイル | Tailwind v4（CSS-first の design token） |
| ホスティング | Cloudflare Pages |
| 演出方針 | 「部屋（room）」は概念ごと作り直し（世界観は残し、実装は新規） |
| パッケージマネージャ | pnpm、Node 24（`.node-version`） |

置き換えの対応表:

| 移行前（Gatsby） | 移行後（Astro） |
|---|---|
| `gatsby-transformer-remark` + GraphQL + codegen | Content Collections v2 + Zod（`src/content.config.ts`） |
| `gatsby-node.js` の `createPages` | `pages/**` の `getStaticPaths` |
| `posts/{日本語タイトル}` | `posts/{ファイル名 slug}`（`_redirects` で 301） |
| frontmatter `createdAt` / `updatedAt` / `createdMonthAt` | `pubDate` / `updatedDate`（月は `pubDate` から導出、`createdMonthAt` 廃止） |
| Emotion（CSS-in-JS） | Tailwind v4 + `@theme` トークン |
| prismjs | Shiki（Astro 組み込み） |
| `gatsby-plugin-transition-link` | View Transitions（`ClientRouter`） |
| `gatsby-image` | `astro:assets` の `<Image>` |
| Jest | （未導入のまま。Vitest / Playwright は積み残し） |
| GitHub Actions → gh-pages | Cloudflare Pages の Git 連携 |

---

## 3. 設計からの差分（実装時の判断）

計画どおりに行かず、方針を変えた点。**ここが現状と食い違いやすいので注意。**

- **Tailwind は Vite プラグインではなく PostCSS 経由にした。**
  当初は `@tailwindcss/vite` を予定していたが、Astro 6 同梱の rolldown-vite と非互換
  （`tsconfigPaths` エラー）だったため `@tailwindcss/postcss` + `postcss.config.mjs` に変更。
  将来 Vite プラグインが追従したら戻してよい。
- **解析は Cloudflare Web Analytics ではなく GA4 にした。**
  当初は Cookie 不要の CF Web Analytics を推していたが、最終的に GA4 を採用
  （`src/components/Analytics.astro`、`PUBLIC_GA_ID` があるときだけ出力）。
- **デプロイは GitHub Actions ではなく CF Pages の Git 連携にした。**
  移行中は `deploy.yml` を置いていたが、公開前の整理（`b99d443`）で撤去。
  現在リポジトリに CI 設定は無く、ビルド設定は CF Pages 側にある。
- **`getStaticPaths` 内のヘルパー** — frontmatter 直書きだと別チャンク化で参照不能になるため、
  `getStaticPaths` 内に定義している。
- **部屋のフレーム数は 3 → 6 に増えた**（`room-f01..f06.png`）。ホバー時の active オーバーレイも
  オブジェクトごとに 6 フレーム。詳細は `room-sprite-spec.md`。
- **AdSense は撤去**（個人サイトを軽く保つため）。
- **i18n は ja 単独で再出発**。Gatsby 時代の未配線 i18n は破棄した。

---

## 4. デザイン適用（frontend-design フェーズ）

構造が立ち上がった後、`frontend-design` でトーンを決めた。

途中、暖色アンバー + フォスファー・ミントの「深夜のプログラマー部屋（cozy-retro）」案を
一度実装したが、最終的に**サイバーパンク寄りの「NEON ROOM」に振り直した**。

確定したもの（現行）:

- カラー: near-black `#05060a` ベース + ネオン cyan `#2ee6ff` / magenta `#ff2e88` / violet `#7b5cff`
- タイポ: Chakra Petch（見出し）/ IBM Plex Sans JP（本文）/ IBM Plex Mono（コード）
- 質感: CRT スキャンライン + グレイン、ターミナル風のヘッダ・パンくず
- トップは全画面の「部屋コンソール」。侵入イントロ → 部屋（`NeonRoom.tsx`）

> cozy-retro 案の名残として、トークン名 `--color-phosphor` / `--color-amber` が残っている
> （実際の値は cyan / magenta）。

---

## 5. 移行時に完了したこと

- [x] Astro 6 / React 19 / Tailwind 4 / TypeScript 6 で足場を作成
- [x] 記事 3 本を `src/content/posts/` へ移送（frontmatter 整形）
- [x] ルーティング再現（トップ / 一覧 / 個別 / タグ別 / 月別 / RSS / sitemap）
- [x] 旧 URL からの 301（`public/_redirects`）
- [x] GA 旧 UA → GA4（計測復活）
- [x] Node を 24 に統一（`.node-version`）
- [x] pnpm 化（`allowBuilds` で sharp・esbuild 承認）
- [x] Cloudflare Pages へ移行、独自ドメイン `tanmen.work` を接続
- [x] 旧 Gatsby 一式・GitHub Actions・AdSense を撤去
- [x] 部屋アートの本実装（6 フレームループ + active オーバーレイ）

積み残しは `ARCHITECTURE.md` の「負債・積み残し」を参照。

---

_移行実施: 2026-06 / 移行前コミット: `05e6a79` / 刷新コミット: `ba659ba`_
_このドキュメントの最終更新: 2026-07-24_
