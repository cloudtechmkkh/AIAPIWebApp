import { Crown, Rocket, Sparkle } from "lucide-react";

export const STRIPE_PRANS = {
    STARTER: 'price_1Ss26GAi1AbxvZ2PmTSfZyrU',
    PRO: 'price_1Ss276Ai1AbxvZ2PXbxDfAj9',
    ENTERPRISE: 'price_1Ss26GAi1AbxvZ2PmTSfZyrU'
}

export const plans = [
    {
        name: 'Starter',
        icon: Sparkle,
        price: '￥1,000',
        describe: '個人利用に最適なエントリープラン',
        features: ['月50クレジット付与', '基本的な画像生成機能', '標準サポート'],
        buttonText: 'Starterプランを選択',
        priceId: STRIPE_PRANS.STARTER
    },
    {
        name: 'Pro',
        icon: Rocket,
        price: '￥2,000',
        describe: 'プロフェッショナルな制作活動に最適なプラン',
        features: ['月120クレジット付与', 'メールサポート', '優先サポート', '商用利用可能'],
        buttonText: 'Proプランを選択',
        priceId: STRIPE_PRANS.PRO
    },
    {
        name: 'Enterprise',
        icon: Crown,
        price: '￥5,000',
        describe: 'エンタープライズ向けの包括的なプラン',
        features: ['月300クレジット付与', '専任サポート', 'カスタム機能', '商用利用可能'],
        buttonText: 'Enterpriseプランを選択',
        priceId: STRIPE_PRANS.ENTERPRISE
    },
]