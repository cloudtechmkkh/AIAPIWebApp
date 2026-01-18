import { getUserCredit } from "@/lib/credit"
import { currentUser } from "@clerk/nextjs/server"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

  async function CreditDisplayContent() {

   const credit = await getUserCredit()

   const user = await currentUser()

  if(!user){
    return (
    <div className="rounded-lg border bg-background p-4">
        <div className="text-sm font-medium text-muted-foreground ">残りクレジット</div>
        <div className="mt-2 font-bold">ログインが必要です</div>
    </div>
  )
  }
  return (
    
    <div className="rounded-lg border bg-background p-4">
        <div className="text-sm font-medium text-muted-foreground ">残りクレジット</div>
        <div className="mt-2 font-bold">{credit}クレジット</div>
    </div>
  )
}

export default async function CreditDisplay(){
    return(
        <Suspense fallback={(
            <div className="rounded-lg border bg-background p-4">
        <div className="text-sm font-medium text-muted-foreground ">残りクレジット</div>
        <div className="mt-2 font-bold">
            <Loader2 className="animate-spin mr-2 inline-block"/>
            読み込み中...
        </div>
    </div>
        )}>
            <CreditDisplayContent/>
        </Suspense>
    )
}
