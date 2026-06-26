import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Validate email format
    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    // Create Sanity doc: { _type: 'newsletterSubscriber', email, subscribedAt: new Date() }
    await sanityWriteClient.create({
      _type: 'newsletterSubscriber',
      email,
      subscribedAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Newsletter Subscription Error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
