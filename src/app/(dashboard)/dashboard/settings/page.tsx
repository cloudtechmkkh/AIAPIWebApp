import ProfileSection from "@/components/dashboard/profile-section"
import SubscriptionSettingsForm from "@/components/dashboard/subscription-settings-form"
import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export default async function SettingPage() {

    const user = await currentUser()

    if (!user) {
        throw new Error("ユーザーが見つかりません")
    }

    const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
        include: {
            Subscription: true
        }
    })

    if (!dbUser) {
        throw new Error("DBユーザーが見つかりません")
    }

    return (

        <div>
            <h2 className="text-2xl">設定</h2>
            <p className="text-sm text-muted-foreground">アカウントの管理とサブスクリプションの設定を管理します</p>
            <div>
                <ProfileSection
                    email={user.emailAddresses[0].emailAddress}
                    subscriptionStatus={dbUser.subscriptionStatus}
                    nextBillingDate={dbUser.Subscription?.stripeCurrentPeriodEnd}
                />
            </div>
            <div>
                <SubscriptionSettingsForm
                    user={{
                        id: dbUser.id,
                        subscriptionStatus: dbUser.subscriptionStatus,
                    }}
                />
            </div>
        </div>
    )
}
