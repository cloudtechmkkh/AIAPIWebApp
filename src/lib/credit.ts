import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "./prisma"

export async function getUserCredit(){
    try{
       const user = await currentUser()

       if(!user){
        return 0
       }

       const dbUser = await prisma.user.findUnique({
        where: {clerkId: user.id},
        select: {credits: true}
       })

       return dbUser?.credits ?? 0
    } catch(error){
        console.error('Error fetching user credit:', error)
        return 0
    }
}