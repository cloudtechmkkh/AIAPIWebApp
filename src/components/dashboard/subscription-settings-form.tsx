"use client"

import { Button } from "../ui/button"

type SubscriptionSettingsFormProps = {
    user:{
        id: string
        subscriptionStatus: string
    }
}

export default function SubscriptionSettingsForm({user}: SubscriptionSettingsFormProps) {

    const handleChange = async() => {
        try{
             const response = await fetch('/api/create-portal-session', {
                method: 'POST',
             })
             const data = await response.json()
             if(data.url){
                window.location.href = data.url
             }
        } catch(error){
            console.error("Error redirecting to portal session:", error)
        }
    }

  return (
    <div className="grid border-2 gap-4 p-4 rounded-lg max-w-2xl"> 
        {user.subscriptionStatus !== "FREE" ? (
            <>
            <p className="text-sm text-muted-foreground">現在のサブスクリプションを管理します</p>
            <Button onClick={handleChange}>サブスクリプション管理</Button>
            </>
        ) : (
            <>
            <p className="text-sm text-muted-foreground">まだサブスクリプションに登録していません</p>
            </>
        )}
    </div>
  )
}
