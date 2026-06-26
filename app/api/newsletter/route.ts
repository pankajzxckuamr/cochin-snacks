import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    // Write to Sanity CMS using the write client
    const newSubscriber = await sanityWriteClient.create({
      _type: 'newsletterSubscriber',
      email,
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Subscription successful!', id: newSubscriber._id },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Newsletter Subscription Error:', error)
    return NextResponse.json(
      { message: 'Failed to process subscription. Please try again later.' },
      { status: 500 }
    )
  }
}
