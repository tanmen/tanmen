---
title: nodenv環境下のwebstormでyarnを使えるようにする
createdMonthAt: 2020-08
createdAt: 2020-08-25
updatedAt: 2020-08-25
tags: [Node.js, Tool]
---
Jetbrainsが大好きな皆様

私もその一人です。

最近jsの需要も高くなり、WebStormを愛用しているのですがnodenv環境下だとWebStormでnode関連のコマンドが全部実行できませんでした。

これはWebStorm側がnodenv内のyarnやnpmがうまく探せない問題が起因しています。

## `jetbrains-npm`
npmを利用しているユーザ向けに、`jetbrains-npm`というライブラリがあります。

こちらはWebStormに対して、npmを認識させるライブラリです。

ただこちらを利用していると、npm環境下では特に問題ありませんが、install等yarnを利用して実行をしてくれません。

その為、yarn.lockファイルを利用していくれなかったり、install時にpackage-lock.jsonが作成されたりしてしまいます。

## `jetbrains-yarn`
今回それらの問題を解消する為に、`jetbrains-yarn`というライブラリを作成しました。

内容はほぼ`jetbrains-npm`というライブラリと同じです。

ただshimやコマンドがyarnへ向いている形になっています。

お困りの方は`jetbrains-yarn`をご利用ください。

