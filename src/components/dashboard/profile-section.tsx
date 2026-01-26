
type ProfileSectionProps = {
    email: string;
    subscriptionStatus: string;
    nextBillingDate: Date | undefined;
}

export default function ProfileSection({email, subscriptionStatus, nextBillingDate}: ProfileSectionProps) {
  return (
    <div className="space-y-4">
         <h2 className="text-xl font-semibold">プロフィール</h2>
         <div className="border-2 rounded-lg gap-4 p-4 max-w-2xl">
            <div className="gap-1">
                <p className="text-sm font-medium">メールアドレス</p>
                <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <div className="gap-1">
                <p className="text-sm font-medium">現在のプラン</p>
                <p className="text-sm text-muted-foreground">{subscriptionStatus}</p>
            </div>
            <div className="gap-1">
                <p className="text-sm font-medium">次回の請求日</p>
                <p className="text-sm text-muted-foreground">{nextBillingDate?.toLocaleDateString('ja-JP')}</p>
            </div>
         </div>
    </div>
  )
}
