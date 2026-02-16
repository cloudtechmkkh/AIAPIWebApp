
import { currentUser } from "@clerk/nextjs/server";
import CreditDisplay from "@/components/dashboard/credit-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wand2, ImageIcon, Sparkles, ArrowRight, Crown } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            ようこそ{user?.firstName ? `、${user.firstName}さん` : ""}
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI画像編集ツールで創造性を解き放ちましょう
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/plan">
            <Crown className="mr-2 h-4 w-4" />
            プランを見る
          </Link>
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreditDisplay />
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              今月の利用
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0回</div>
            <p className="text-xs text-muted-foreground mt-1">
              生成・編集した画像数
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              プラン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">無料プラン</div>
            <p className="text-xs text-muted-foreground mt-1">
              月5クレジット付与
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tools Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">利用可能なツール</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI画像生成</CardTitle>
              <CardDescription>
                テキストから高品質な画像を生成します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full gap-2">
                <Link href="/dashboard/tools/image-generator">
                  使ってみる
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>背景削除</CardTitle>
              <CardDescription>
                ワンクリックで画像の背景を自動削除
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full gap-2">
                <Link href="/dashboard/tools/remove-bg">
                  使ってみる
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>画像最適化</CardTitle>
              <CardDescription>
                画像サイズを自動で最適化して容量削減
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full gap-2">
                <Link href="/dashboard/tools/optimize">
                  使ってみる
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Start Guide */}
      <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            クイックスタートガイド
          </CardTitle>
          <CardDescription>
            すぐに始められる簡単3ステップ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside text-sm text-muted-foreground">
            <li>上記のツールから好きな機能を選択</li>
            <li>テキストや画像をアップロードして編集</li>
            <li>生成・編集された画像をダウンロード</li>
          </ol>
          <div className="mt-6">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/dashboard/tools/image-generator">
                <Wand2 className="h-4 w-4" />
                画像生成を試す
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
