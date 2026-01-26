import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { currentUser } from "@clerk/nextjs/server"


export async function POST(){
    try {
      const user = await currentUser()
        if(!user){
            return new Response("Unauthorized", {status: 401})
        }

      const dbUser = await prisma.user.findUnique({
        where: {clerkId: user.id}
      })

      if(!dbUser || !dbUser.stripeCustomerId){
        return new Response("User not found", {status: 404})
      }

      const session = await stripe.billingPortal.sessions.create({
  customer: dbUser.stripeCustomerId,
  return_url: `${process.env.BASE_URL}/dashboard/settings`,
});
     return new Response(JSON.stringify({url: session.url}))
    } catch(error){
        console.error("Error creating portal session:", error)
        return new Response("Error creating portal session", {status: 500})
    }
}