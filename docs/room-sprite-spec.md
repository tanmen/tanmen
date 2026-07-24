# ルーム・スプライト仕様（ドット絵 / サイバーパンク / 6フレーム）

root ページの全画面コンソールに表示する「部屋＝メニュー」のドット絵アセットを
生成するための**アートディレクション仕様**。生成側（ComfyUI 等）へ渡す single source。

> 実装済み。現行アセットは `public/room/room-f01..06.png` と
> `public/room/active/<id>-active-f01..06.png`、エンジンは `src/components/islands/NeonRoom.tsx`。
> **アセットを差し替え・追加するときはこの仕様に合わせること。**
> 当初は 3 フレームで設計していたが、実装で **6 フレーム**に増やしている（§5 / §6 参照）。

---

## 1. ねらい

- 参考: 詳細なアイソメ・ドット絵の部屋（家具・植物・小物が密なドールハウス cutaway）。
- それを **サイバーパンク**にリキー（暖色 cozy → ダーク＋ネオン）。
- **人物を配置**（机で開発する男・本棚で読書する男 など）。
- **3枚の画像を順々に切り替えて**アニメ感を出す（クラシックな 2〜3 フレームループ）。

## 2. 画面・寸法

- 表示先は**全画面コンソール**（ワイド）。アートは固定のアイソメ・シーン1枚を `cover` で敷く。
- 推奨オーサリング解像度: **1920×1080（16:9）**。ピクセルグリッドは実効 **480×270 を ×4**（＝1ドット=4px）程度で、ピクセルが潰れない密度。
- アイソメ部屋を**中央**に置き、周囲は**暗いサイバー空間**（霧・薄いネオンの漏れ・ダスト）で埋める。
- 背景は **#04050a（near-black）**。透過でも可（サイトの暗背景に載る）。

## 3. パレット（サイトと一致させる — 厳守）

| 用途 | hex |
|---|---|
| 背景 / 影 | `#04050a` `#05060a` |
| 面 / 中間 | `#0b0e16` `#11151f` |
| 明部 / 文字 | `#dbe7f2`（cool white） |
| ネオン cyan（主） | `#2ee6ff` |
| ネオン magenta（熱） | `#ff2e88` |
| ネオン violet | `#7b5cff` |
| 警告 LED | `#ff3d71` |

- 暖色は**画面の発光やランプのごく一部のみ**に限定。全体は cool・ダーク。
- ネオンは**光源として**（机のモニタ＝cyan、サーバ＝magenta、本棚＝violet…）配置すると導線色と一致する。

## 4. 配置すべきオブジェクト（= ナビ）

エンジン（`src/components/islands/NeonRoom.tsx`）のノードと対応。各オブジェクトを
**明確に判別できる形**で部屋内に置く（ホットスポットを重ねる）。

> 以下は当初の理想像。**実際に採用した部屋（24680）の構成と座標は §9 が正**。
> 部屋を丸ごと作り直すときだけこの表を出発点にする。

| オブジェクト | ナビ | ネオン色 | 「生きてる」演出（3フレームで動かす） |
|---|---|---|---|
| **DESK**（机＋デュアルモニタ） | profile | cyan `#2ee6ff` | 男が**開発**（タイピング、画面にコードが流れる、キーボード光） |
| **BOOKSHELF**（壁の本棚） | blog | violet `#7b5cff` | 男が**読書**（ページめくり、頭の微動） |
| **SERVER**（サーバラック） | services | magenta `#ff2e88` | **エラー＋煙**（赤LED点滅、上部から煙パフ） |
| **TOOLBOX**（工具箱） | tools | cyan `#2ee6ff` | 工具がチラッと光る／飛び出す |
| **MAIL**（端末／ポスト） | contact | violet `#7b5cff` | 受信ランプ点滅、封筒/通知 |

- 人物は **1〜2体**（机の男、本棚の男）。サイバーパンクな装い（フード／ネオンの差し色）。
- 猫や観葉植物などの小物は cozy 感の名残として可（ただし cool グレード）。

## 5. 6フレーム・アニメーションの作り方（肝）

- **同一構図**で、微小な差分だけを変えた **6枚（frame 01〜06）** を作る。
- フレーム間で動かすもの: 画面のコード行、LED、煙のパフ、人物の手/頭、ネオンのちらつき、ダスト。
- サイトはこれを **≈6fps（1枚 160ms）で 01→…→06→01 ループ**再生し、ローファイなドット絵アニメ感を出す。
- **構図・カメラ・ライティングは6枚で完全固定**（ズレると破綻する）。差分は"中身の動き"のみ。

## 6. 納品物

- `room-f01.png` 〜 `room-f06.png` … **同一寸法**・同一構図の6フレーム（ゼロ埋め2桁）。
- ピクセルパーフェクト（**アンチエイリアス無し**・ハードエッジ）、背景は `#04050a` か透過。
- 置き場所: リポジトリの `public/room/`（エンジンが6枚を cover で敷き、cross-cycle 再生）。
- オブジェクト別の "active"（ホバー時に重ねる強調アニメ）は `public/room/active/` に
  `<id>-active-f01..06.png` の 6 フレームで置く（§9）。無ければグロー表示にフォールバックする。

## 7. 生成プロンプト（たたき台 / 英語）

Positive:
```
isometric pixel art, 3/4 cutaway dollhouse view of a cyberpunk programmer's
apartment at night, HD-2D, dense detailed furniture, dual-monitor desk with a
hooded man coding (cyan screen glow), wall bookshelf with a man reading (violet
glow), server rack with blinking red LEDs venting smoke (magenta glow), toolbox,
mail terminal, plants, rug, cat, dark cool palette near-black #04050a with neon
cyan #2ee6ff / magenta #ff2e88 / violet #7b5cff as the only light sources,
volumetric neon haze, drifting dust, crisp dithering, limited palette,
pixel-perfect, hard edges, no anti-aliasing, centered in widescreen with dark
cyber atmosphere around it
```
Negative:
```
warm, cozy, pastel, daytime, beige background, evenly lit, washed out, blurry,
anti-aliased, smooth gradients, photorealistic, 3d render, baked scanlines,
vignette, window frame, UI, text, watermark
```
※ サイト側がスキャンライン・グレイン・グリッチ・bloom を別途重ねるので、**素材側で焼き込まない**。

## 8. エンジン契約（これに合わせる）

- ノード座標は §9 で確定済み（`NeonRoom.tsx` の `SPOTS` が正）。`x` / `y` は**画面 % の中心**、
  `w` / `h` は画面 % のサイズ。§9 の px footprint（1920×1080 基準）と等価。
- 全画面表示・`prefers-reduced-motion` 時は静止（frame 01 のみ）・各ノードは実 `<a>`（a11y/SEO）。
- 初回訪問のみ「侵入イントロ」を再生し、2 回目以降は `localStorage`（`tanmen:room-visited`）で省略する。

---

---

## 9. active オーバーレイ — 最終部屋(24680)確定版

ホットスポット位置を 24680 の実オブジェクトに合わせて確定。各オブジェクトの
**透過6フレーム active オーバーレイ**を、下記 footprint（1920×1080, 左上 x,y / w×h）に
ぴったり収まるように生成する。エンジンは `/room/active/<id>-active-f0N.png`(N=1..6)を
ホバー/フォーカス時に footprint へ重ねて再生する（無ければグロー表示にフォールバック）。

| id | ナビ | 対象(24680) | ネオン | footprint TL(x,y) / size | 中心・サイズ(%) | active 演出（24680 の実オブジェクトに合わせる）|
|---|---|---|---|---|---|---|
| `desk`    | profile  | 右壁の大モニタ | cyan    | (1392,378) / 211×173 | 78,43 / 11×16 | 画面が起動しコードがスクロール、cyan の発光が脈動 |
| `shelf`   | blog     | 左の大本棚     | violet  | (269,173) / 499×475  | 27,38 / 26×44 | 本が1冊抜け出して発光・ページがめくれる、violet シマー |
| `server`  | services | 左中央のマゼンタ画面卓 | magenta | (538,594) / 230×194 | 34,64 / 12×18 | 画面に ERROR 点滅、赤LED高速点滅、煙が立ち上る、火花 |
| `toolbox` | tools    | 右下の物置き棚 | cyan   | (1181,605) / 250×194 | 68,65 / 13×18 | 引出し/フタが開き、工具かドローンが浮上して光る |
| `mail`    | contact  | 奥中央の細い棚 | violet  | (730,194) / 192×324  | 43,33 / 10×30 | ホログラムのリングが波及、ランプ点滅、通知ポップ |

「中心・サイズ(%)」が `NeonRoom.tsx` の `SPOTS` に入っている値（px footprint と等価）。
アートを差し替えたら**両方**を更新すること。

注: 24680 の部屋には「机で開発する男 / サーバラック / 工具箱」は literal には無く、
本棚・壁モニタ・画面卓・棚で構成される。演出は上記のとおり**実オブジェクトに即した形**に
再定義している（人物を足したい場合は各 footprint 内に小さなドット人物を重ねてもよい）。

- 透過PNG・各6フレーム・ループ・~8–10fps、パレットは §3 と同一、AAなし。
- footprint 外は透明。スキャンライン/ビネット/枠は焼き込まない（サイトが重ねる）。
- 命名: `desk-active-f01..06.png` 等 → `public/room/active/` に配置。

---

_作成: 2026-06-15 / 最終更新: 2026-07-24 / 対象: root 全画面コンソール / engine: `NeonRoom.tsx`_
