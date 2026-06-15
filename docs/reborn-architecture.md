# リボーン後の目標アーキテクチャ（to-be）

tanmen.work を 2026 のモダン構成でゼロから作り直すための設計ドキュメント。
現状（as-is）は ルートの `ARCHITECTURE.md` を参照。

## 確定した土台

| 項目 | 採用 |
|---|---|
| フレームワーク | **Astro 6**（コンテンツ主体・JS ゼロ送出。演出だけ island） |
| インタラクティブ | **React 19 island**（演出部分のみ。`client:*` で局所ハイドレート） |
| スタイル | **Tailwind v4**（Oxide エンジン / CSS-first の design token） |
| ホスティング | **Cloudflare Pages**（帯域無制限・グローバル最速） |
| 演出方針 | 「部屋（room）」は**概念ごと作り直し**（世界観は残し、実装は新規） |

> 見た目のデザイン（tone / type / color / motion）自体は、このスタックが立ち上がった後に
> `frontend-design` skill で別途やる。本書は**構造**を確定するもの。

---

## 1. 技術スタック詳細

### コア
- `astro` 6
- `@astrojs/react` … 演出を React island として同居
- `@astrojs/mdx` … 記事でコンポーネントを使えるように（任意。MD のままでも可）
- `@astrojs/sitemap` … sitemap.xml 自動生成
- `@astrojs/rss` … RSS フィード（ブログとして今風）

### スタイル
- `tailwindcss` v4 + `@tailwindcss/vite`（Astro 6 では Vite プラグイン経由が正。旧 `@astrojs/tailwind` は使わない）
- design token は `@theme` ブロックで CSS-first 定義

### コンテンツ処理
- Markdown/MDX は Astro 組み込み（Rust 製プロセッサ）
- シンタックスハイライトは **Shiki**（組み込み。prismjs は不要）
- code title / 図表が必要なら remark/rehype プラグインで付与（現 code-titles / plantuml 相当）

### 演出
- `motion`（旧 Framer Motion）を React island 内で使用。必要なら GSAP も island 限定で
- ページ遷移は Astro の **View Transitions（ClientRouter）**。現 `transition-link` を標準機能で置換

### 画像
- `astro:assets` の `<Image>`（sharp 内蔵）。現 `gatsby-image` を置換

### 解析（推奨）
- **Cloudflare Web Analytics**（Cookie 不要・無料・CF Pages と相性良）。旧 UA は破棄
- AdSense は**外す前提**（個人サイトを軽く保つ）。収益化を続けるなら残せる → 要確認

### 開発ツール
- パッケージマネージャ: **pnpm**（推奨。bun でも可）
- Lint/Format: **Biome**（一体型・高速）or 従来の ESLint + Prettier
- テスト: **Vitest**（ユニット）+ **Playwright**（e2e）。Jest は破棄
- ランタイム: **Node 22 LTS**（CI/ローカルを統一）

---

## 2. ディレクトリ構成

```
astro.config.mjs
src/
├── content.config.ts        posts コレクション定義（Zod で frontmatter を型付け）
├── content/
│   └── posts/*.md(x)        記事本体（現 src/pages/posts/*.md を移設）
├── pages/
│   ├── index.astro          トップ（「部屋」island を埋め込む）
│   ├── profile.astro / services.astro / tools.astro / contact.astro
│   ├── 404.astro
│   ├── posts/
│   │   ├── index.astro      記事一覧
│   │   ├── [...slug].astro   記事個別（getStaticPaths）
│   │   ├── tags/[tag].astro  タグ別
│   │   └── dates/[month].astro 月別
│   └── rss.xml.ts           RSS フィード
├── layouts/
│   ├── BaseLayout.astro     <head>/SEO/ClientRouter/Analytics
│   └── PostLayout.astro     記事用（目次・パンくず等）
├── components/
│   ├── *.astro              静的 UI（Header/Footer/PostCard…）— 大半はこちら
│   └── islands/
│       ├── Room.tsx         「部屋」インタラクト（client:visible）
│       └── TypeScene.tsx    タイピング演出（client:idle）
└── styles/
    └── global.css           @import "tailwindcss"; + @theme トークン
```

ポイント:
- Atomic Design は**維持可能だが軽くなる**。多くは island 不要の `.astro` 静的コンポーネントになる。
- `src/templates/`（Gatsby のページテンプレ）と `components/templates/` の名前衝突は解消される（Astro は `pages/` のファイルがルート、`layouts/` がレイアウト）。

---

## 3. コンテンツ層（GraphQL → Content Collections）

現状の `gatsby-transformer-remark` + `graphql-codegen` + `gatsby-node.js createPages` は、
**Content Collections v2 + `getStaticPaths`** に置き換わる。GraphQL もコード生成も不要。

### content.config.ts（スケッチ）

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),        // 現 createdAt
    updatedDate: z.coerce.date().optional(), // 現 updatedAt
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

frontmatter の整理:
- `createdAt` → `pubDate` / `updatedAt` → `updatedDate`
- `createdMonthAt` は**廃止**（`pubDate` から月を導出。月別ページもこれで生成）
- `tags` はそのまま

### ページ生成（現 createPages の置換）

| 現 `gatsby-node.js` | Astro |
|---|---|
| `posts/{title}` | `pages/posts/[...slug].astro` の `getStaticPaths`（slug は**ファイル名由来**）|
| `posts/tags/{tag}` | `pages/posts/tags/[tag].astro`（`getCollection` でタグ集計）|
| `posts/dates/{month}` | `pages/posts/dates/[month].astro`（`pubDate` で月集計）|

```ts
// posts/[...slug].astro 抜粋
export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map(p => ({ params: { slug: p.id }, props: { post: p } }));
}
```

> **URL の変化（要判断）**: 現状は `posts/{日本語タイトル}` を URL に使っている
> （例 `/posts/ブログ始めました`）。新構成は**ファイル名 slug**（例 `/posts/blog-started`）。
> 既存 3 記事のファイル名は ascii なので綺麗になるが、旧 URL とは変わる。
> 被リンク/SEO を守るなら CF Pages 側で `_redirects` による 301 を用意する。

---

## 4. スタイル（Tailwind v4・CSS-first トークン）

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-bg:      /* ... */;
  --color-fg:      /* ... */;
  --color-accent:  /* ... */;
  --font-sans:     /* ... */;
  --font-mono:     /* ... */;
}
```

- design token を `@theme` に集約 → ユーティリティと自動連動（`bg-bg` 等）。
- 具体的な配色/タイポは `frontend-design` フェーズで決定（ここでは器だけ）。
- 記事本文は `@tailwindcss/typography`（prose）+ 必要に応じ markdown.css の流用。

---

## 5. デプロイ（Cloudflare Pages）

静的出力（`astro build` → `dist/`）をそのまま CF Pages に載せる。**SSR アダプタは不要**。

方式（どちらかを選択 → 要確認）:
- **A. CF Pages の Git 連携**（推奨）: GitHub に push → CF が自動ビルド&配信。CI 自前不要。
- **B. GitHub Actions + `wrangler pages deploy`**: 現行の GH Actions 流儀を維持したい場合。

- カスタムドメイン `tanmen.work` を CF Pages 側へ移設（DNS を Cloudflare に）。
- 環境変数（旧 `GOOGLE_*`）は廃止 or CF Pages の環境変数へ。
- 旧 `peaceiris/actions-gh-pages` は撤去。

---

## 6. 残課題（移行作業のチェックリスト）

as-is で見つかった負債の解消も同時に行う:

- [ ] GA 旧 UA → Cloudflare Web Analytics（計測復活）
- [ ] 未配線 i18n（`src/i18n/*`）→ **ja 単独で再出発**（推奨）。en を後で足すなら Astro 組み込み i18n routing。要確認
- [ ] `pages/index.tsx` の死にクエリ・starter 残骸は移行時に破棄
- [ ] CI/ローカルの Node を 22 LTS に統一
- [ ] `comparetors`（スペルミス）→ `comparators` に修正、または不要なら破棄
- [ ] AdSense の存続を判断（推奨: 外す）

---

## 7. 移行フェーズ案

1. **足場作り**: 新規 Astro 6 プロジェクト初期化、Tailwind v4 / React / mdx / sitemap / rss 導入、Node 22 固定
2. **コンテンツ移送**: `src/content/posts/` へ記事移設、frontmatter 整形、`content.config.ts` で型付け
3. **ルーティング**: 記事/タグ別/月別ページを `getStaticPaths` で再現、RSS・sitemap
4. **静的 UI**: Header/Footer/一覧/記事レイアウトを `.astro` で再構築（design は仮）
5. **演出 island**: 「部屋」「タイピング」を新概念で React island として実装（frontend-design 連携）
6. **デザイン適用**: `frontend-design` で tone/type/color/motion を決定し反映
7. **デプロイ**: CF Pages 接続、独自ドメイン移設、旧 URL リダイレクト、解析確認
8. **解体**: 旧 Gatsby 一式を撤去

---

---

## 8. 実装状況（2026-06-15 / branch: `reborn/astro`）

足場〜ブログ移送〜ルーティング〜デプロイ設定まで実装し、`astro build` が通る状態。

実装済み:
- Astro 6.4.6 / React 19 island / Tailwind 4.3.1 / TypeScript 6 で初期化（Node 24 で build 確認）
- 記事3本を `src/content/posts/` へ移送（`createdAt→pubDate` / `updatedAt→updatedDate` に整形、`createdMonthAt` 廃止）
- Content Collections v2 + Zod 型付け（`content.config.ts`）
- ルーティング: トップ / 記事一覧 / 記事個別(`[...slug]`) / タグ別 / 月別 / RSS / sitemap → **15 ページ生成**
- レイアウト・ヘッダー・フッター・PostCard・design token の器（暫定ダークテーマ）
- island プレースホルダ: `TypeScene`(タイピング) / `Room`(ComfyUI 成果物の差し込み口)
- View Transitions（ClientRouter）/ Shiki ハイライト / prose(typography)
- Cloudflare Pages 用 `public/_redirects` + GitHub Actions `deploy.yml`

設計からの差分（実装上の判断）:
- **Tailwind v4 は Vite プラグインではなく PostCSS 経由**にした。`@tailwindcss/vite` が Astro 6 同梱の rolldown-vite と非互換（`tsconfigPaths` エラー）だったため、`@tailwindcss/postcss` + `postcss.config.mjs` に変更。将来 Vite プラグインが追従したら戻してよい。
- `getStaticPaths` 内で使うヘルパーは frontmatter 直書きだと別チャンク化で参照不能 → `getStaticPaths` 内に定義。

未実装（後工程）:
- 本デザイン（tone/type/color/motion）→ `frontend-design` skill
- 「部屋」探索アニメの本実装 → 別PCの ComfyUI 成果物を `Room.tsx` に差し込み
- PlantUML 図 / コードタイトル（旧 remark プラグイン相当）は現状プレーンな code block に退避
- i18n（ja/en）/ 解析（Cloudflare Web Analytics 埋め込み）/ 旧 npm 依存の脆弱性監査

---

_作成: 2026-06-15 / 対象コミット: `05e6a79` / 実装ブランチ: `reborn/astro`_
