# アーキテクチャ概要

個人サイト **tanmen.work** の現状（as-is）アーキテクチャ。
2026-07-24 時点。

> 2020-08 に Gatsby v2 で作られたサイトを、2026-06 に **Astro 6 へ全面刷新**した（`ba659ba feat: Gatsby から Astro 6 へサイトを刷新`）。
> Gatsby 時代の構成と移行時の設計判断は `docs/reborn-architecture.md`（移行記録）を参照。

---

## 1. これは何か

- **種別**: 静的サイトジェネレータ（SSG）で生成する個人サイト + ブログ
- **公開先**: **Cloudflare Pages**（独自ドメイン `tanmen.work`）
- **リポジトリ**: `tanmen/tanmen` — ルートの `README.md` は GitHub プロフィールも兼ねる
- **コンテンツ**: 固定ページ（Profile / Services / Tools / Contact）+ Markdown ブログ
- **設計方針**: 静的 `.astro` を基本とし、演出だけ React island に切り出す（JS は必要な場所にだけ送る）
- **コンセプト**: 「NEON ROOM」— サイバーパンクなドット絵の部屋がそのままナビゲーションになる

---

## 2. 技術スタック

| 領域 | 採用技術 | バージョン |
|---|---|---|
| フレームワーク | Astro | 6.4 |
| UI（island） | React / React DOM | 19.2 |
| 言語 | TypeScript | 6.0 |
| スタイル | Tailwind CSS（**PostCSS 経由**） | 4.3 |
| 記事スタイル | `@tailwindcss/typography`（prose） | 0.5 |
| アニメーション | motion（旧 Framer Motion） | 12.40 |
| Markdown | Astro 組み込み + `@astrojs/mdx`、ハイライトは Shiki | — |
| フィード / SEO | `@astrojs/rss` / `@astrojs/sitemap` | — |
| ページ遷移 | View Transitions（`ClientRouter`） | — |
| 解析 | GA4（`PUBLIC_GA_ID` があるときだけ出力） | — |
| パッケージマネージャ | pnpm | 11.1 |
| ランタイム | Node（`.node-version`） | 24.13.1 |
| フォーマッタ | Prettier（`.prettierrc`） | — |

- **Tailwind は Vite プラグインではなく PostCSS 経由**。`@tailwindcss/vite` が Astro 6 同梱の rolldown-vite と非互換（`tsconfigPaths` エラー）だったため、`@tailwindcss/postcss` + `postcss.config.mjs` を使っている。将来 Vite プラグインが追従したら戻してよい。
- `pnpm-workspace.yaml` の `allowBuilds` で `sharp` / `esbuild` のビルドスクリプトを承認している。
- 環境変数は `PUBLIC_GA_ID` のみ（Cloudflare Pages 側で設定。未設定なら GA タグは出力されない = ローカルでは無効）。

---

## 3. ディレクトリ構造

```
.
├── astro.config.mjs          site URL / integrations（react・mdx・sitemap）
├── postcss.config.mjs        Tailwind v4 を PostCSS 経由で読む
├── public/                   そのまま配信される静的ファイル
│   ├── _headers              CF Pages のキャッシュ / セキュリティヘッダ
│   ├── _redirects            旧 Gatsby の日本語 URL → 新 slug の 301
│   ├── favicon.ico / og.png / robots.txt
│   └── room/                 部屋アート room-f01..06.png
│       └── active/           ホバー時オーバーレイ <id>-active-f01..06.png
├── docs/
│   ├── reborn-architecture.md   Gatsby → Astro 移行の設計・記録（アーカイブ）
│   └── room-sprite-spec.md      部屋スプライトのアートディレクション仕様
└── src/
    ├── site.config.ts       SITE（タイトル/説明/URL/SNS）と NAV（ナビ項目）
    ├── content.config.ts    posts コレクション定義（Zod で frontmatter を型付け）
    ├── content/posts/*.md   記事本体
    ├── pages/               ファイルベースルーティング
    │   ├── index.astro      トップ（全画面の部屋コンソール）
    │   ├── profile.astro / services.astro / tools.astro / contact.astro
    │   ├── 404.astro
    │   ├── posts/
    │   │   ├── index.astro        記事一覧
    │   │   ├── [...slug].astro    記事個別（getStaticPaths）
    │   │   ├── tags/[tag].astro   タグ別一覧
    │   │   └── dates/[month].astro 月別一覧
    │   └── rss.xml.ts       RSS フィード
    ├── layouts/
    │   ├── BaseLayout.astro  head / SEO / OGP / フォント / ClientRouter / Analytics / CRT オーバーレイ
    │   └── PostLayout.astro  記事用（パンくず・タグ・日付・prose）
    ├── components/
    │   ├── Header.astro / Footer.astro / PostCard.astro / Analytics.astro
    │   └── islands/
    │       ├── NeonRoom.tsx  部屋＝ナビの全画面コンソール（client:only="react"）
    │       └── TypeScene.tsx タイピング演出（※現在どこからも import されていない）
    └── styles/global.css     Tailwind 読み込み + @theme トークン + 独自ユーティリティ
```

固定ページ（services / tools）のデータは、フロントマターの JS 配列としてページファイル内に直接持っている。増えたら `src/data/` などへ切り出す。

---

## 4. コンテンツ層

Content Collections v2 + Zod。GraphQL もコード生成も無い。

```ts
// src/content.config.ts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

- 記事の **slug はファイル名由来**（`blog-started.md` → `/posts/blog-started`）。
- タグ別 / 月別ページは `getCollection` の結果を集計して `getStaticPaths` で生成する。月は `pubDate` から導出（Gatsby 時代の `createdMonthAt` は廃止）。
- `getStaticPaths` から呼ぶヘルパーは frontmatter 直書きだと別チャンク化されて参照できないため、`getStaticPaths` 内に定義している。

---

## 5. デザイン / 演出

- **コンセプト**: 「NEON ROOM」— クールなダーク背景にネオン。トークンは `src/styles/global.css` の `@theme` に集約。
- **カラー**: 背景 `#05060a` 系、文字 `#dbe7f2`、ネオン cyan `#2ee6ff` / magenta `#ff2e88` / violet `#7b5cff`、LED `#ff3d71`。
  - 後方互換で `--color-phosphor`（≈cyan）/ `--color-amber`（≈magenta）という名前が残っている。名前と実際の色が一致していないので、触るときは値を見る。
- **タイポ**: Chakra Petch（見出し）/ IBM Plex Sans JP（本文）/ IBM Plex Mono（コード・プロンプト）。Google Fonts から読み込み。
- **質感**: CRT スキャンライン + グレインを `BaseLayout` の全画面オーバーレイで重ねる。
- **トップの部屋**: `NeonRoom.tsx` が `public/room/room-f01..06.png` を約 6fps（160ms 間隔）でクロスサイクルし、アート上の各オブジェクトにナビのホットスポット（`<a>`）を重ねる。ホバー / フォーカスで `public/room/active/<id>-active-f01..06.png` を footprint に重ねて再生。初回訪問のみ「侵入イントロ」を出し、2 回目以降は `localStorage`（`tanmen:room-visited`）で省略。
- 演出は `prefers-reduced-motion` を尊重する。
- アートの生成仕様は `docs/room-sprite-spec.md`。

---

## 6. ビルド & デプロイ

```bash
pnpm install
pnpm dev      # 開発サーバー（astro dev）
pnpm build    # 静的ビルド → dist/
pnpm preview  # ビルド結果の確認
pnpm check    # astro check（型チェック）
```

- **ホスティング: Cloudflare Pages**。GitHub の Git 連携で、**デフォルトブランチへの push をトリガーに自動ビルド & デプロイ**される。
- 静的出力（`dist/`）をそのまま配信する。**SSR アダプタは使っていない**。
- **リポジトリ内に CI 設定は無い**（`.github/workflows` なし）。ビルドコマンド・Node バージョン・環境変数（`PUBLIC_GA_ID`）は Cloudflare Pages のプロジェクト設定側にある。**変更はダッシュボードで行う必要があり、リポジトリからは追跡できない。**
- ヘッダ / リダイレクトは `public/_headers` と `public/_redirects`（CF Pages が解釈する）。

---

## 7. 負債・積み残し

| 項目 | 内容 |
|---|---|
| `TypeScene.tsx` が未使用 | `src/components/islands/TypeScene.tsx` はどこからも import されていない。使うか消すか要判断。 |
| トークン名の不一致 | `--color-phosphor` / `--color-amber` が実際には cyan / magenta。移行時の後方互換の名残。 |
| テストが無い | Vitest / Playwright とも未導入。Gatsby 時代の Jest は廃止済み。 |
| Lint が無い | Prettier のみ。ESLint / Biome は未導入。 |
| デプロイ設定が不可視 | CF Pages の設定がリポジトリ外。`wrangler.toml` 等で宣言的にするか要判断。 |
| PlantUML / コードタイトル | Gatsby 時代の remark プラグイン相当は未移植。プレーンな code block のまま。 |
| i18n | 未実装（ja 単独）。Gatsby 時代の未配線 i18n は移行時に破棄済み。 |
| `.idea/` がコミットされている | JetBrains の設定がリポジトリに含まれている。 |

---

_最終更新: 2026-07-24 / 対象コミット: `033b095`_
