"use server"

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export type createStripeSessionState = {
    status: "idle" | "success" | "error",
    error?: string
    redirectUrl?: string
}

export async function createStripeSession
(prevState:createStripeSessionState, formData:FormData ):Promise<createStripeSessionState>
{

    const priceId = await formData.get('priceId') as string

    const user = await currentUser()

    if(!user){
       throw new Error('ユーザーが認証されていません')
    }

    try {

        let dbUser = await prisma.user.findUnique({
            where: {clerkId: user.id}
        })

        if(!dbUser){
            dbUser = await prisma.user.findUnique({
                where: {email: user.emailAddresses[0]?.emailAddress}
            })
        }

        if(dbUser){
            dbUser = await prisma.user.update({
              where: {id: dbUser.id},
              data: {clerkId: user.id}
            })
        }

        let customerId = dbUser?.stripeCustomerId

        if(!customerId){
          const customer = await stripe.customers.create({
            email: user.emailAddresses[0]?.emailAddress,
            metadata: {
              clerkId: user.id
            }
          })

        await prisma.user.upsert({
          where: {clerkId: user.id},
          update: {
            stripeCustomerId: customer.id
          },
          create: {
            email: user.emailAddresses[0]?.emailAddress,
            clerkId: user.id,
            stripeCustomerId: customer.id
          }
        })
           customerId = customer.id
         }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/dashboard/plan`,
      metadata: {
        clerkId: user.id
      }
    });
    
    if (!session.url){
      throw new Error('Stripeセッションの作成に失敗しました')
    }

    return {
      status: "success",
      error: '',
      redirectUrl: session.url
    }
  } catch {
     return {
      status: "error",
      error: 'Stripeセッションの作成に失敗しました',
      redirectUrl: ''
     }
  }
}