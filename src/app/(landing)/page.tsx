import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Wand2, ImageIcon, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1676299081847-c0326d0cb484?q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI搭載の画像編集ツール
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              AIで創造性を
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                解き放つ
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              誰でも簡単に画像を生成・編集できるAI SaaSプラットフォーム。
              <br />
              テキストから画像を生成したり、背景を瞬時に削除できます。
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  無料で始める
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">詳しく見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              強力な機能
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              プロフェッショナルな画像編集がワンクリックで
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI画像生成</CardTitle>
                <CardDescription>
                  テキストから高品質な画像を生成。お好みのスタイルで理想の画像を作成できます。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>背景削除</CardTitle>
                <CardDescription>
                  ワンクリックで画像の背景を自動削除。複雑な切り抜き作業が不要になります。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>画像最適化</CardTitle>
                <CardDescription>
                  画像サイズを自動で最適化。品質を保ったまま容量を削減できます。
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-24 sm:py-32 bg-zinc-100 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              クリエイティブな可能性は無限大
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1686904423955-b1f11d92cec8?q=80&w=800"
                alt="AI Generated Art"
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=800"
                alt="AI Design"
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=800"
                alt="Creative AI"
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                なぜ選ばれるのか
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                最新のAI技術を使って、誰でも簡単にプロレベルの画像編集が可能です
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "高速な画像生成・処理",
                  "直感的で使いやすいインターフェース",
                  "クレジット制で安心の料金体系",
                  "商用利用可能なプラン",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700 dark:text-zinc-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/dashboard">
                    今すぐ始める
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200"
                  alt="AI Workspace"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-xl bg-gradient-to-tr from-primary/20 to-purple-600/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-primary/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="border-none bg-gradient-to-br from-primary/90 to-purple-600/90 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                今すぐ始めましょう
              </h2>
              <p className="mt-4 text-lg text-white/90">
                無料プランで5クレジットをプレゼント。すぐにAI画像編集を体験できます。
              </p>
              <div className="mt-10">
                <Button asChild size="lg" variant="secondary" className="gap-2">
                  <Link href="/dashboard">
                    無料で始める
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            © 2026 AI SaaS Application. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
