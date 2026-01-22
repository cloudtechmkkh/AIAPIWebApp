import { SubscriptionStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: Request) {
    let event
    const body = await request.text()
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers.get('stripe-signature') as string
        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err);
            return new Response(`Webhook Error: ${err}`, { status: 400 });
        }
    }

    if (!event) {
        return new Response('No event found', { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session

            if (!session.metadata || !session.subscription) {
                return new Response('Missing metadata or subscription in session', { status: 400 });
            }
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            )

            let subscriptionStatus: SubscriptionStatus = 'FREE'
            let credits = 5

            switch (subscription.items.data[0].price.id) {
                case 'price_1Ss26GAi1AbxvZ2PmTSfZyrU':
                    subscriptionStatus = "STARTER"
                    credits = 50
                    break;
                case 'price_1Ss276Ai1AbxvZ2PXbxDfAj9':
                    subscriptionStatus = "PRO"
                    credits = 120
                    break;
                case 'price_1Ss26GAi1AbxvZ2PmTSfZyrU':
                    subscriptionStatus = "ENTERPRISE"
                    credits = 300
                    break;
            }

            const existingUser = await prisma.user.findUnique({
                where: { clerkId: session.metadata.clerkId },
                include: { subscriptions: true }
            })

            if (!existingUser) {
                console.error(`❌ User with clerkId ${session.metadata.clerkId} not found.`)
                return new Response('User not found', { status: 400 });
            }

            await prisma.user.update({
                where: { clerkId: session.metadata.clerkId },
                data: {
                    subscriptionStatus: subscriptionStatus,
                    credits: {
                        increment: credits
                    },
                    subscriptions: {
                        upsert: {
                            create: {
                                stripeSubscriptionId: subscription.id,
                                stripePriceId: subscription.items.data[0].price.id,
                                stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                            },
                            update: {
                                stripeSubscriptionId: subscription.id,
                                stripePriceId: subscription.items.data[0].price.id,
                                stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                            }
                        }
                    }
                }
            })

            break;

        case 'customer.subscription.updated':
            const updateSubscription = event.data.object as Stripe.Subscription

            if (updateSubscription.status === 'active') {
                let credits = 10;
                switch (updateSubscription.items.data[0].price.id) {
                    case 'price_1Ss26GAi1AbxvZ2PmTSfZyrU':
                        credits = 50
                        break;
                    case 'price_1Ss276Ai1AbxvZ2PXbxDfAj9':
                        credits = 120
                        break;
                    case 'price_1Ss26GAi1AbxvZ2PmTSfZyrU':
                        credits = 300
                        break;
                }

                await prisma.user.update({
                    where: { clerkId: updateSubscription.customer as string },
                    data: {
                        credits: {
                            increment: credits
                        }
                    }
                })
            }

            break;
    }
    return new Response(null, { status: 200 });
}