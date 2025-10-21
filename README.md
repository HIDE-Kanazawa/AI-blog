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
lib/                 # Sanity クライアントなど（Issue #2 で実装予定）
sanity/schemas/      # Sanity スキーマ（Issue #2 で実装予定）
scripts/             # 運用スクリプト置き場（今後追加）
tests/               # テストコード（今後追加）
public/              # 公開静的アセット
```

`lib/` や `sanity/` はまだ空ですが、次のイシューで必要なファイルを追加していきます。

### Phase0 開発メモ

- Sanity の Project ID / Dataset / Write token は Phase0 に限り `lib/sanity.ts` に直書きします（Issue #2 で追加予定）。
- リポジトリは Private を想定し、アクセストークンの取り扱いに注意してください。

### 今後の進め方

- Issue #1: Next.js 雛形（本タスク）
- Issue #2: Sanity `post` スキーマとクライアント
- Issue #3: 一覧ページ `/`
- Issue #4: 詳細ページ `/posts/[slug]`
- Issue #5: 管理用投稿フォーム `/admin` と投稿 API

Issue ベースで段階的に実装し、Phase0 のゴール「手動投稿した記事の公開」を実現します。
