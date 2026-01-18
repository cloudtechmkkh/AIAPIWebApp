import { createUser, deleteUser, updateUser } from '@/lib/user'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    let evt
    try{
     evt = await verifyWebhook(req)
    } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }

  try{
    if (evt.type === 'user.created') {
     
      const {id, email_addresses} = evt.data
      const email = email_addresses?.[0]?.email_address
      if (!id || !email) {
        return new Response('Invalid user data', { status: 400 })
      }
      const user = await createUser(id, email)
      return NextResponse.json({user}, {status: 201})
}
  
     if(evt.type === 'user.updated'){
       const {id, email_addresses} = evt.data
       const email = email_addresses?.[0]?.email_address
       if (!id || !email) {
         return new Response('Invalid user data', { status: 400 })
       }
       const user = await updateUser(id, email)
       return NextResponse.json({user}, {status: 200})
    }

    if(evt.type === 'user.deleted'){
      const {id} = evt.data
      if (!id) {
        return new Response('Invalid user data', { status: 400 })
      }
      const user = await deleteUser(id)
      return NextResponse.json({user}, {status: 200})
    }

    // Do something with payload
    // For this guide, log payload to console

    return new Response('ok', { status: 200 })
  } catch(error){
    console.error('Error handling evt', error)
    return new Response('Error handling evt', {status: 500})
  }
}