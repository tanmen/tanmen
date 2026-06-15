# ルーム・スプライト仕様（ドット絵 / サイバーパンク / 3フレーム）

root ページの全画面コンソールに表示する「部屋＝メニュー」のドット絵アセットを
生成するための**アートディレクション仕様**。生成側（ComfyUI 等）へ渡す single source。

> 重要: これは「サイトデザインに調和させた**新規**アート」の仕様。
> 既に生成済みの warm な pixelroom には**引きずられない**こと（パレットも構図も作り直す）。

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

| オブジェクト | ナビ | ネオン色 | 「生きてる」演出（3フレームで動かす） |
|---|---|---|---|
| **DESK**（机＋デュアルモニタ） | profile | cyan `#2ee6ff` | 男が**開発**（タイピング、画面にコードが流れる、キーボード光） |
| **BOOKSHELF**（壁の本棚） | blog | violet `#7b5cff` | 男が**読書**（ページめくり、頭の微動） |
| **SERVER**（サーバラック） | services | magenta `#ff2e88` | **エラー＋煙**（赤LED点滅、上部から煙パフ） |
| **TOOLBOX**（工具箱） | tools | cyan `#2ee6ff` | 工具がチラッと光る／飛び出す |
| **MAIL**（端末／ポスト） | contact | violet `#7b5cff` | 受信ランプ点滅、封筒/通知 |

- 人物は **1〜2体**（机の男、本棚の男）。サイバーパンクな装い（フード／ネオンの差し色）。
- 猫や観葉植物などの小物は cozy 感の名残として可（ただし cool グレード）。

## 5. 3フレーム・アニメーションの作り方（肝）

- **同一構図**で、微小な差分だけを変えた **3枚（frame A / B / C）** を作る。
- フレーム間で動かすもの: 画面のコード行、LED、煙のパフ、人物の手/頭、ネオンのちらつき、ダスト。
- サイトはこれを **≈3〜4fps（1枚 250〜330ms）で A→B→C→A ループ**再生し、ローファイなドット絵アニメ感を出す。
- **構図・カメラ・ライティングは3枚で完全固定**（ズレると破綻する）。差分は"中身の動き"のみ。

## 6. 納品物

- `room-f1.png` `room-f2.png` `room-f3.png` … **同一寸法**・同一構図の3フレーム。
- ピクセルパーフェクト（**アンチエイリアス無し**・ハードエッジ）、背景は `#04050a` か透過。
- 置き場所: リポジトリの `public/room/`（エンジンが3枚を cover で敷き、cross-cycle 再生）。
- 任意: オブジェクト別の "active"（ホバー時に差し替える強調アニメ）を別途 3 フレームで。

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

- ノード座標（% / 16:10 基準、暫定）: desk(27,50) shelf(52,30) server(76,46) toolbox(38,70) mail(64,68)。
  → アートのオブジェクト位置に合わせて後でエンジン側を微調整する。
- 全画面表示・`prefers-reduced-motion` 時は静止（frame A のみ）・各ノードは実 `<a>`（a11y/SEO）。

---

_作成: 2026-06-15 / 対象: root 全画面コンソール / engine: `NeonRoom.tsx`_
