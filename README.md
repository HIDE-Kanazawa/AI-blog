## Vibe Coding Blog (Phase0)

Vibe Coding Blog の Phase0（投稿＆表示のみ）を進めるための Next.js プロジェクト雛形です。  
この段階では自動化処理を一切行わず、手動投稿と表示まわりの土台づくりに集中します。

### 必要環境

- Node.js 18 以上
- npm (本リポジトリは npm を標準とします)

### セットアップ

```bash
npm install
npm run dev
# ブラウザで http://localhost:3000 を開く
```

一覧ページには「まだ記事がありません」というプレースホルダーが表示されます。  
今後 `/admin` から投稿した記事がここに並ぶ想定です。

### ディレクトリ構成（Phase0 雛形）

```
app/                 # App Router エントリ
lib/                 # Sanity クライアント、型定義、スラッグ生成
sanity/schemas/      # Sanity post スキーマ
```

### Phase0 開発メモ

- Sanity の Project ID / Dataset / Write token は Phase0 に限り `lib/sanity.ts` に直書きします。
- リポジトリは Private を想定し、アクセストークンの取り扱いに注意してください。

### Sanity 設定手順（Phase0）

1. Sanity プロジェクトの ID・データセット・ write token を取得し、`lib/sanity.ts` の定数を書き換える。
2. `sanity/schemas/post.ts` を Studio 側のスキーマに組み込み、`schemaTypes` を `sanity/schemas/index.ts` から読み込む。
3. CLI もしくは Studio から `post` ドキュメントを 1 件作成し、`publishAt` と本文が保存できることを確認する。

### 今後の進め方

- Issue #1: Next.js 雛形（本タスク）
- Issue #2: Sanity `post` スキーマとクライアント
- Issue #3: 一覧ページ `/`
- Issue #4: 詳細ページ `/posts/[slug]`
- Issue #5: 管理用投稿フォーム `/admin` と投稿 API

Issue ベースで段階的に実装し、Phase0 のゴール「手動投稿した記事の公開」を実現します。
