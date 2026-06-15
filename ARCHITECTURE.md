# アーキテクチャ概要

個人サイト **tanmen.work** のアーキテクチャ整理ドキュメント。
2026-06-15 時点の現状把握（コード変更前のスナップショット）。

> このサイトは 2020-08 に作成され、最終コミットは 2021-07。**Gatsby v2 製**で、
> フレームワーク・依存ともに数世代古い状態にある（詳細は「乖離と負債」を参照）。

---

## 1. これは何か

- **種別**: 静的サイトジェネレータ（SSG）で生成する個人サイト + ブログ
- **公開先**: GitHub Pages（独自ドメイン `tanmen.work`）
- **コンテンツ**: ページ（自己紹介 / サービス / ツール / コンタクト）+ Markdown ブログ
- **設計方針**: Atomic Design + TypeScript + Emotion（CSS-in-JS）

---

## 2. 技術スタック

| 領域 | 採用技術 | バージョン |
|---|---|---|
| フレームワーク | Gatsby | 2.23 |
| UI | React / React DOM | 16.12 |
| 言語 | TypeScript | 3.9 |
| スタイル | Emotion（`@emotion/core` / `@emotion/styled`） | 10 |
| アニメーション | react-spring 8 / gsap 3 / gatsby-plugin-transition-link / d3-ease | — |
| Markdown | gatsby-transformer-remark（+ prismjs / code-titles / plantuml） | — |
| 画像 | gatsby-image / gatsby-plugin-sharp / gatsby-transformer-sharp / background-image | — |
| 型生成 | gatsby-plugin-graphql-codegen → `types/gatsby-graphql.ts` | — |
| 解析 / 広告 | gatsby-plugin-google-analytics（旧 UA）/ gatsby-plugin-google-adsense | — |
| PWA | gatsby-plugin-offline | — |
| テスト | Jest + @testing-library/react-hooks | — |

環境変数: `GOOGLE_TRACKING_ID` / `GOOGLE_ADSENSE_ID`（CI の Secrets から注入）。

---

## 3. ディレクトリ構造

```
.
├── gatsby-config.js      プラグイン構成・siteMetadata
├── gatsby-node.js        createPages（記事 / タグ別 / 月別ページの動的生成）
├── gatsby-browser.js     グローバル CSS の読み込み
├── styles/               font.css / global.css / markdown.css
├── static/               favicon.ico（そのまま配信される静的ファイル）
├── types/                gatsby-graphql.ts（自動生成された GraphQL 型）
└── src/
    ├── pages/            ファイルベースのルーティング
    │   ├── index.tsx     トップ
    │   ├── profile.tsx / services.tsx / tools.tsx / contact.tsx
    │   ├── posts.tsx     記事一覧（タグ / 月の集計を含む）
    │   ├── 404.tsx
    │   └── posts/*.md    ブログ記事本体（frontmatter 付き Markdown）
    ├── templates/        createPages から参照される Gatsby テンプレート
    │   ├── post.tsx          記事個別ページ
    │   ├── tagPosts.tsx      タグ別一覧
    │   └── datePosts.tsx     月別一覧
    ├── components/       Atomic Design
    │   ├── atoms/        Box / Center / Stretch / Backboard + links/（Swipe/Active/Under/Flat/Image）
    │   ├── molecules/    Header / Footer / Side / Layout / PostCard(List) / Tag・DateCount / Breadcrumb / Jumbotron
    │   ├── organisms/    TypeScene / ComingSoon / NotFound + room/（Desk/Server/Mail/Toolbox/Bookshelf）
    │   └── templates/    各ページの中身（IndexTemplate / ProfileTemplate / ServicesTemplate / ...）
    ├── hooks/            useType / useTypeSentence / useTrigger / useOnlyFirst（タイプ演出系）
    ├── models/           post.ts（記事ドメインモデル）
    ├── utils/            converters/（postConverter）/ comparetors/（postComparetor）
    ├── fragments/        post.ts（GraphQL フラグメント）
    ├── metas/            seo.tsx（SEO / Helmet）
    └── i18n/             ja.json / en.json / index.ts（※未配線 — 後述）
```

> **`components/templates/` と `src/templates/` の違い**
> - `src/templates/` … Gatsby の `createPages` が `component` として参照する「ルートになるテンプレート」
> - `components/templates/` … Atomic Design 上の最上位レイヤー（ページの中身を組み立てる UI）
> 名前が衝突していて紛らわしい。整理時の改名候補。

---

## 4. データフローとレンダリング

### ビルド時のページ生成

1. `src/pages/posts/*.md` を `gatsby-source-filesystem`（name: `posts`）が読み込む
   - frontmatter: `title` / `createdMonthAt` / `createdAt` / `updatedAt` / `tags`
2. `gatsby-transformer-remark` が Markdown → HTML 化（prismjs でシンタックスハイライト、plantuml 図、code-titles）
3. `gatsby-node.js` の `createPages` が GraphQL で集計し、3 種のページを動的生成:
   - `posts/{title}` … 記事個別（`src/templates/post.tsx`）
   - `posts/tags/{tag}` … タグ別（`src/templates/tagPosts.tsx`）
   - `posts/dates/{month}` … 月別（`src/templates/datePosts.tsx`）
4. `gatsby-plugin-graphql-codegen` がスキーマから `types/gatsby-graphql.ts` を生成

### ページ内クエリ

- 各 `src/pages/*.tsx` は `export const query = graphql\`...\`` でページクエリを定義（例: `posts.tsx`）。
- 画像は `gatsby-image` の Sharp fixed/fluid で最適化配信。

---

## 5. ビルド & デプロイ

`.github/workflows/publish.yml`（master への push をトリガー）:

```
checkout → setup-node(14) → setup-graphviz → yarn → yarn test → yarn build → gh-pages へ deploy
```

- ホスティング: **GitHub Pages**（`public/` を配信、`cname: tanmen.work`）
- CI の Node は **14**（ローカルは Node 24 — 乖離あり）
- 主要 npm スクリプト: `develop` / `build` / `serve` / `clean` / `test` / `format`

---

## 6. 乖離と負債（整理・改善の論点）

最新（2026 時点）との差分と、実際にコードを読んで見つかった綻び。

### バージョンの乖離

| 対象 | 現状 | 最新 | 影響 |
|---|---|---|---|
| Gatsby | 2.23 | 5 | メジャー 3 つ遅れ。Node 24 でローカルが動かない可能性が高い |
| React | 16.12 | 19 | メジャー 3 つ遅れ |
| TypeScript | 3.9 | 5.x | 型機能・互換性で大きな差 |
| Emotion | 10 | 11 | v11 で import パス等の破壊的変更あり |
| Node（CI） | 14 | 22 LTS | CI とローカル（24）が乖離 |

### 機能的な綻び（実コード由来）

1. **GA が旧 UA 計測** — Universal Analytics は 2023 年に計測停止済み。`gatsby-plugin-google-analytics` のままでは**アクセス解析が事実上死んでいる**。GA4 相当への移行が必要。
2. **i18n が未配線** — `src/i18n/index.ts` は 0 バイトで、`ja.json` / `en.json` はどこからも import されていない（`grep` で参照ゼロ）。多言語化は未完のまま放置されたデッドコード。
3. **`pages/index.tsx` の死にクエリ** — `const query = graphql\`...\`` が **export されていない**ため Gatsby のページクエリとして機能しない。中身も Gatsby starter のサンプル残骸（`blog/avatars/kyle-mathews.jpeg`）。要削除。
4. **CI / ローカルの Node 乖離** — CI は 14、手元は 24。`yarn install` 時点で Gatsby 2 系のネイティブ依存（sharp 等）がビルドできないリスク。
5. **テスト網羅が薄い** — テストは `useType` フック 1 本のみ（`src/hooks/__tests__/useType.test.ts`）。

### 命名・構造の負債

- `src/templates/` と `src/components/templates/` の名前衝突（前述）。
- `utils/comparetors`（`comparator` のスペルミス）。

---

## 7. フレームワークの将来性メモ

Gatsby は 2023 年の Netlify 買収後、**メンテナンスモード**（散発的な修正中心、コアメンバーは離脱）。
React 19 対応など最低限の更新は続くが、新規 SSG の主流は **Astro / Next.js** に移行している。

今後の選択肢（このドキュメントでは決定しない。判断材料として記録）:

- **A. 現状維持で延命** — Gatsby 5 + React 18/19 へアップグレード。工数中・破壊的変更多。
- **B. 他フレームワークへ移行** — Astro（SSG/ブログに最適）or Next.js。工数大・将来性高。
- **C. 文書化のみ（現フェーズ）** — まず本ドキュメントで現状を固め、A/B は別途判断。

---

_最終更新: 2026-06-15 / 対象コミット: `05e6a79`_
