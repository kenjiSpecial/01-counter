# HYPER CLICKER - Counter Game

Miniゲーム作成 1/100

## 概要

HYPER CLICKERは、10秒間でできるだけ多くクリックする3Dクリッカーゲームです。React Three Fiberを使用した3Dグラフィックスと、Framer Motionによる滑らかなアニメーションが特徴です。

## 主な機能

- **3Dターゲット**: クリック可能な3Dオブジェクト（二十面体）
- **弾む動き**: クリック時にオブジェクトが縮んで戻る（Spring animation）
- **色変化**: クリックするたびに色がランダムに変わる
- **パーティクルエフェクト**: クリックした瞬間に破片が飛び散る
- **UI演出**: 残り時間が少なると赤くなるタイマー
- **スコア表示**: リアルタイムでスコアを表示
- **リザルト画面**: ゲーム終了後にスコアを表示し、X（Twitter）でシェア可能

## 技術スタック

- **Next.js 16** - Reactフレームワーク
- **TypeScript** - 型安全性
- **React Three Fiber** - 3Dレンダリング
- **Three.js** - 3Dグラフィックスライブラリ
- **@react-three/drei** - R3Fのヘルパーライブラリ
- **Framer Motion** - UIアニメーション
- **Tailwind CSS** - スタイリング

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクト構造

```
01-counter/
├── app/
│   └── page.tsx              # メインページコンポーネント
├── components/
│   ├── ClickTarget.tsx       # クリックターゲットの3Dコンポーネント
│   ├── Explosion.tsx         # 爆発エフェクトの3Dコンポーネント
│   └── GameUI.tsx            # UIレイヤー（ヘッダー、開始画面、リザルト）
├── types/
│   └── game.ts               # 型定義
└── utils/
    └── constants.ts          # 定数とユーティリティ関数
```

## ゲームの遊び方

1. 「GAME START」ボタンをクリック
2. 10秒間、できるだけ多く3Dオブジェクトをクリック
3. 時間終了後、スコアが表示されます
4. 「RETRY」で再プレイ、「SHARE X」でスコアをシェア

## ビルド

### 通常のNext.jsビルド

```bash
npm run build
```

ビルド後のサーバー起動:

```bash
npm run start
```

### Cloudflare Workers用ビルド

```bash
npm run build:cf
```

ローカルでプレビュー:

```bash
npm run preview
```

## Cloudflare Workersへのデプロイ

このプロジェクトはCloudflare Workersにデプロイ可能です。

### ローカルからのデプロイ

```bash
npm run deploy
```

### Cloudflare Workers Buildsでの設定

Cloudflare Workers Buildsを使用する場合、以下のコマンドを設定してください：

- **ビルドコマンド**: `npm run build:cf`
- **デプロイコマンド**: `npm run deploy:cf`

または、直接コマンドを指定する場合：

- **ビルドコマンド**: `opennextjs-cloudflare build`
- **デプロイコマンド**: `opennextjs-cloudflare deploy`

詳細は[Cloudflare Workers Next.js ドキュメント](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)を参照してください。

## ライセンス

MIT
