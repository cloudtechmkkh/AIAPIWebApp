'use client'
import { createStripeSession, createStripeSessionState } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { plans } from "@/config/plan";
import { Check } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";

const initialState:createStripeSessionState = {
    status: "idle"
}

export default function PlanPage() {

        const [state, formAction] = useActionState(async(prevState:createStripeSessionState, formData:FormData) => {
           const result = await createStripeSession(prevState, formData)

           if(result.status === "error"){
                toast.error('エラー',{
                    description: result.error
                })
           }else if(result.status === "success" && result.redirectUrl){
            window.location.href = result.redirectUrl
           }
           return result
        },initialState)

    return (
        <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
            <div className="container mx-auto py-12 px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">料金プラン</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        あなたの制作ニーズに合わせて、最適なプランを選択してください
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan) => {
                        const isProPlan = plan.name === 'Pro';
                        return (
                            <div
                                key={plan.name}
                                className={`relative flex flex-col rounded-xl border transition-all duration-300 hover:shadow-lg ${
                                    isProPlan
                                        ? 'lg:scale-105 border-primary/50 bg-card shadow-lg'
                                        : 'border-border bg-card shadow-sm hover:shadow-md'
                                }`}
                            >
                                {isProPlan && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                                            おすすめ
                                        </span>
                                    </div>
                                )}

                                <div className="flex-1 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${isProPlan ? 'bg-primary/10' : 'bg-muted'}`}>
                                            <plan.icon className={`size-6 ${isProPlan ? 'text-primary' : 'text-muted-foreground'}`} />
                                        </div>
                                        <h2 className="text-2xl font-bold">{plan.name}</h2>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-6">{plan.describe}</p>

                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-4xl font-bold ${isProPlan ? 'text-primary' : ''}`}>
                                                {plan.price}
                                            </span>
                                            <span className="text-muted-foreground">/月</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <form action={formAction} className="p-6 sm:p-8 pt-0">
                                    <input type="hidden" name="priceId" value={plan.priceId} />
                                    <Button
                                        type="submit"
                                        variant={isProPlan ? 'default' : 'outline'}
                                        className="w-full"
                                        size={'lg'}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </form>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center text-sm text-muted-foreground">
                    <p>すべてのプランに、30日間の無料トライアルが含まれています</p>
                </div>
            </div>
        </div>
    );
}
