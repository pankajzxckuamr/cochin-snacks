import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/client'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validate: all fields are required
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Name, email, subject, and message are all required.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      )
    }

    const submittedAt = new Date().toISOString()

    // 1. Create Sanity doc
    await sanityWriteClient.create({
      _type: 'contactMessage',
      name,
      email,
      subject,
      message,
      submittedAt,
    })

    // 2. Send email via Resend to export@cochinsnacks.com
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Cochin Snacks <onboarding@resend.dev>',
            to: 'export@cochinsnacks.com',
            subject: `New Contact Message: ${subject}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h2 style="color: #1E6B2E; border-bottom: 2px solid #FFD600; padding-bottom: 8px; margin-top: 0;">New Contact Form Message</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
                    <td style="padding: 8px 0; color: #4b5563;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0; color: #4b5563;">
                      <a href="mailto:${email}" style="color: #1E6B2E; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                    <td style="padding: 8px 0; color: #4b5563;">${subject}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date/Time:</td>
                    <td style="padding: 8px 0; color: #4b5563;">${new Date(submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background-color: #f9fafb; border-radius: 6px; border-left: 4px solid #FFD600;">
                  <h3 style="margin-top: 0; color: #374151; font-size: 14px;">Message Content:</h3>
                  <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            `,
          }),
        })

        if (!response.ok) {
          const errText = await response.text()
          console.error('Resend API call failed:', errText)
        }
      } catch (emailErr) {
        console.error('Error sending email notification via Resend:', emailErr)
      }
    } else {
      console.warn('RESEND_API_KEY is not defined, skipping contact email dispatch.')
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact submission' },
      { status: 500 }
    )
  }
}
