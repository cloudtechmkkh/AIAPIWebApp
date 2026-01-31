import { createUser, deleteUser, updateUser } from '@/lib/user'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = "nodejs"
export const preferredRegion = "home"

export async function POST(req: NextRequest) {
    console.log('🔔 Webhook received at:', new Date().toISOString())
    
    let evt
    try{
     evt = await verifyWebhook(req)
     console.log('✅ Webhook verified, event type:', evt.type)
    } catch (err) {
    console.error('❌ Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }

  try{
    if (evt.type === 'user.created') {
     
      const {id, email_addresses} = evt.data
      const email = email_addresses?.[0]?.email_address
      console.log('📝 Creating user:', { clerkId: id, email })
      
      if (!id || !email) {
        console.error('❌ Invalid user data:', { id, email })
        return new Response('Invalid user data', { status: 400 })
      }
      const user = await createUser(id, email)
      console.log('✅ User created successfully:', user.id)
      return NextResponse.json({user}, {status: 201})
}
  
     if(evt.type === 'user.updated'){
       const {id, email_addresses} = evt.data
       const email = email_addresses?.[0]?.email_address
       console.log('📝 Updating user:', { clerkId: id, email })
       
       if (!id || !email) {
         console.error('❌ Invalid user data:', { id, email })
         return new Response('Invalid user data', { status: 400 })
       }
       const user = await updateUser(id, email)
       console.log('✅ User updated successfully')
       return NextResponse.json({user}, {status: 200})
    }

    if(evt.type === 'user.deleted'){
      const {id} = evt.data
      console.log('🗑️ Deleting user:', { clerkId: id })
      
      if (!id) {
        console.error('❌ Invalid user data:', { id })
        return new Response('Invalid user data', { status: 400 })
      }
      const user = await deleteUser(id)
      console.log('✅ User deleted successfully')
      return NextResponse.json({user}, {status: 200})
    }

    // Do something with payload
    // For this guide, log payload to console
    console.log('⚠️ Unhandled event type:', evt.type)
    return new Response('ok', { status: 200 })
  } catch(error){
    console.error('❌ Error handling event:', error)
    return new Response('Error handling evt', {status: 500})
  }
}