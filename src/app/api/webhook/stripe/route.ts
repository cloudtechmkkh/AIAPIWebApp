import { stripe } from "@/lib/stripe";
import { handleSubscriptionCreated, handleSubscriptionUpdated } from "@/lib/subscriptons";
import Stripe from "stripe";

export async function POST(request: Request) {

    try {
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

    const subscriptions = event.data.object as Stripe.Subscription;

    // Handle the event
    switch (event.type) {
        case 'customer.subscription.created':
            await handleSubscriptionCreated(subscriptions);
            break;

        case 'customer.subscription.updated':
            await handleSubscriptionUpdated(subscriptions);
            break;
    }
    return new Response(JSON.stringify({success: true}));
} catch (error) {
    console.error("Error processing webhook event:", error);
    return new Response(`Webhook Error: ${error}`, { status: 400 });
}
}