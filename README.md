# AIAPIWebApp

面接用の説明資料として、プロジェクトの目的・構成・技術スタックが一目でわかるように整理したREADMEです。  
Next.js App Routerで構築したAI SaaSのデモアプリで、認証・サブスク課金・クレジット管理・画像系AI機能を一通り実装しています。

## 概要
- 画像生成と背景除去を行うAIツールを、SaaSとして提供する想定のデモ実装
- Clerkによる認証、Stripeによるサブスク決済、Prismaによるユーザー/契約管理
- クレジット制での利用制御を前提にしたUI/フローを実装

## 主な機能
- サインアップ/ログイン（Clerk）
- ダッシュボード・プラン選択・設定画面
- 画像生成（Stability AI API）
- 背景削除（Stability AI API）
- Stripe Checkout + Webhookでのサブスク管理
- クレジット表示・プラン別の利用設計

## 技術スタック
- フロント/バックエンド: Next.js 16 (App Router), React 18, TypeScript
- UI: Tailwind CSS, Radix UI (shadcn/ui)
- 認証: Clerk
- 決済: Stripe (Checkout, Webhook)
- DB/ORM: PostgreSQL, Prisma
- 画像処理: sharp
- フォーム/バリデーション: React Hook Form, Zod
- 外部AI: Stability AI API

## 主要ルート
- `/` ランディング
- `/sign-in` `/sign-up` 認証
- `/dashboard` ダッシュボード
- `/dashboard/tools/[tool]` ツール画面（画像生成/背景削除）
- `/dashboard/plan` プラン選択
- `/dashboard/settings` 設定
- `/api/generate-image` 画像生成API
- `/api/remove-background` 背景削除API
- `/api/webhook/stripe` Stripe Webhook

## ディレクトリ構成
- `src/app` ルーティング（App Router）
- `src/components` UI/画面コンポーネント
- `src/actions` Server Actions（AI実行・Stripeセッション作成）
- `src/lib` Prisma/Stripe/ユーザー管理の共通処理
- `prisma` スキーマ・マイグレーション
- `src/config` ナビ/プラン定義（Stripe Price ID含む）

## セットアップ
```bash
npm install
npm run dev
```

DB準備（初回のみ）:
```bash
npx prisma migrate dev
```

## 環境変数
`.env` に以下を設定してください。
```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB
BASE_URL=http://localhost:3000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

STABILITY_API_KEY=sk_xxx
```

## 補足（面接向けポイント）
- `User` と `Subscription` をPrismaで管理し、Stripe Webhookで同期
- Stripe Price IDは `src/config/plan.ts` で定義
- AI系APIの結果は `sharp` で最適化して返却

## スクリプト
- `npm run dev` 開発サーバ起動
- `npm run build` 本番ビルド
- `npm run start` 本番起動
- `npm run lint` ESLint
