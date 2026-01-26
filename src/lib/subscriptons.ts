/* eslint-disable @typescript-eslint/no-explicit-any */
import { STRIPE_PRANS } from "@/config/plan";
import Stripe from "stripe";
import { prisma } from "./prisma";
import { SubscriptionStatus } from "@/generated/prisma/enums";


function getPlanDetails(subscription: Stripe.Subscription) {
    const priceId = subscription.items.data[0].price.id
    let status:SubscriptionStatus = "FREE" 
    let credits = 50

    switch(priceId){
        case STRIPE_PRANS.STARTER:
            status = "STARTER"
            credits = 50
            break;
        case STRIPE_PRANS.PRO:
            status = "PRO"
            credits = 120
            break;
        case STRIPE_PRANS.ENTERPRISE:
            status = "ENTERPRISE"
            credits = 300
            break;
    }
    return { status, credits, priceId }
}

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    const {priceId, status, credits} = getPlanDetails(subscription)
    const customerId = subscription.customer as string

    try {
       const result = await prisma.user.update({
            where: { stripeCustomerId: customerId },
            data: {
                subscriptionStatus: status,
                credits: {
                    increment: credits
                },
                subscriptions: {
                    create: {
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: priceId,
                        stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000)
                    }
                }
            }
        })
        return result
    } catch(error){
        console.error("Error handling subscription created:", error)
        throw error
    }
}

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const {priceId, status, credits} = getPlanDetails(subscription)
    const customerId = subscription.customer as string

    try {
      const isCancelled = subscription.status === 'canceled'
      const effectiveStatus = isCancelled ? 'FREE' : status
      const effectiveCredits = isCancelled ? 0 : credits

       const result = await prisma.user.update({
            where: { stripeCustomerId: customerId },
            data: {
                subscriptionStatus: effectiveStatus,
                credits: {
                    increment: effectiveCredits
                },
                subscriptions: {
                    create: {
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: priceId,
                        stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000)
                    }
                }
            }
        })
        return result
    } catch(error){
        console.error("Error handling subscription updated:", error)
        throw error
    }
}

// export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
//     const {priceId, status, credits} = getPlanDetails(subscription)
//     const customerId = subscription.customer as string

//     try {
//            const user = await currentUser()
//         if(!user){
//             throw new Error("Unauthorized")
//         }
        
//        const result = await prisma.user.update({
//             where: { clerkId: customerId },
//             data: {
//                 subscriptionStatus: status,
//                 credits: {
//                     increment: credits
//                 },
//                 subscriptions: {
//                     create: {
//                         stripeSubscriptionId: subscription.id,
//                         stripePriceId: priceId,
//                         stripeCurrentPeriodEnd: new Date((subscription as any).current_period_end * 1000)
//                     }
//                 }
//             }
//         })
//         return result
//     } catch(error){
//         console.error("Error handling subscription created:", error)
//         throw error
//     }
// }