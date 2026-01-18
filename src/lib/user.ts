import { prisma } from "@/lib/prisma";

export async function createUser(clerkId:string, email:string){
   return await prisma.user.upsert({
    where: {email: email},
    create: {
        clerkId,
        email,
        credits: 5,
        subscriptionStatus: 'FREE'
    },
    update: {
        clerkId,
        email
    }
   })
}

export async function updateUser(clerkId:string, email:string){
    return await prisma.user.updateMany({
        where: {clerkId: clerkId},
        data: {
            email: email
        }
    })
}

export async function deleteUser(clerkId:string){
    const existingUser = await prisma.user.findUnique({
        where: {clerkId: clerkId}
    })
    if(!existingUser){
        console.log(`User with clerkId ${clerkId} does not exist.`)
        return null
    }

    return await prisma.user.deleteMany({
        where: {clerkId: clerkId}
    })
}