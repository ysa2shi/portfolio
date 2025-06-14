[English README is here](./README.md)

# 🧑‍💻 ポートフォリオ

私の個人的なポートフォリオサイトで、Astroを使って構築されています。開発に関することで学んだことを記録するポートフォリオです。

このサイトはでは私の最新の記事を Zenn から取得して表示しており、GitHub Actions を使用して自動的に更新されます。

## 🔧 技術スタック

- Astro – 静的サイトジェネレーター
- TypeScript
- Tailwind CSS – ユーティリティファースト CSS フレームワーク
- GitHub Actions – 毎日のビルドとデプロイを自動化
- Cloudflare Pages – デプロイメントプラットフォーム

## セットアップ

- このリポジトリをクローン

```bash
git clone https://github.com/ysa2shi/portfolio.git
cd portfolio
```

- .env.example から .env ファイルを作成

```bash
cp .env.example .env
```

- プレースホルダー ({your-username}) を実際のユーザー名に置き換えます。

```env
PUBLIC_GITHUB_USER_URL=https://github.com/your-username
PUBLIC_ZENN_USER_URL=https://zenn.dev/your-username
```

- 依存関係をインストール

```bash
pnpm install
```

- 開発サーバーを起動

```bash
pnpm run dev
```

## 🚀 プロジェクト構成

```
/
├── config/
├── public/
├── src/
│   └── pages/
│   |   └── index.astro
│   └── types/
│       └── index.d.ts
└── package.json
```

Astro は `src/pages/` ディレクトリ内の `.astro` または `.md` ファイルを探します。各ページは、そのファイル名に基づいてルートとして公開されます。

`src/components/` について特別なことはありませんが、私たちはそこに任意の Astro/React/Vue/Svelte/Preact コンポーネントを置くのが好きです。

画像のような静的アセットは、`public/` ディレクトリに配置できます。

## 🧞 コマンド

すべてのコマンドは、プロジェクトのルートからターミナルで実行されます：

| コマンド                   | アクション                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | 依存関係をインストール                            |
| `pnpm dev`             | `localhost:4321` でローカル開発サーバーを開始      |
| `pnpm build`           | プロダクションサイトを `./dist/` にビルド          |
| `pnpm preview`         | デプロイ前にビルドをローカルでプレビュー     |
| `pnpm astro ...`       | `astro add` や `astro check` のような CLI コマンドを実行 |
| `pnpm astro -- --help` | Astro CLI の使い方をヘルプ                       |

## 🏗️ 仕組み・アーキテクチャ概要

- Astro による静的サイト生成（SSG）を採用し、高速なページ表示を実現
- `src/pages/` 配下の .astro ファイルが自動的にルーティングされる
- UIは `src/components/` で分割管理し、再利用性を向上
- Zenn の最新記事は `src/utils/fetchZennFeed.ts` でRSSフィードから取得し、トップページ等で表示
- サイト設定や定数は `config/` ディレクトリで一元管理
- 静的アセット（画像・アイコン等）は `public/` 配下に配置

## 🚢 デプロイ方法

このプロジェクトは Cloudflare Pages でのデプロイを推奨しています。

1. Cloudflare Pages の管理画面で新規プロジェクトを作成
2. GitHub リポジトリと連携
3. ビルドコマンド：

   ```sh
   pnpm install && pnpm build
   ```

4. 出力ディレクトリ：

   ```
   dist
   ```

5. 環境変数（必要に応じて .env の内容を設定）

## 📬 お問い合わせ

ご質問やご相談は [GitHub Issues](https://github.com/ysa2shi/portfolio/issues) または [作者のGitHub](https://github.com/ysa2shi) までご連絡ください。

[English README is here](./README.md)
