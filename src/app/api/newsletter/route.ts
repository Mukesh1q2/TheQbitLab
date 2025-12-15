import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  interests: z.array(z.string()).optional(),
})

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = NewsletterSchema.parse(body)

    // Send welcome email
    try {
      await sendEmail({
        to: validatedData.email,
        subject: 'Welcome to TheQbitlabs Newsletter!',
        html: `
          <h2>Welcome to TheQbitlabs Newsletter!</h2>
          <p>Hi ${validatedData.name || 'there'},</p>
          <p>Thank you for subscribing to our newsletter! You'll be the first to know about:</p>
          <ul>
            <li>Latest AI and technology insights</li>
            <li>New project case studies</li>
            <li>Industry trends and analysis</li>
            <li>Exclusive content and tutorials</li>
            <li>Special offers and announcements</li>
          </ul>
          <p>You can unsubscribe at any time using the link in our emails.</p>
          <p>Best regards,<br>TheQbitlabs Team</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again.' },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    })
  } catch (error) {
    console.error('Error processing unsubscribe:', error)
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    )
  }
}

// GET /api/newsletter - Get newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
  try {
    // Return empty list for now since we're not storing newsletter data
    return NextResponse.json({
      subscribers: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        pages: 0,
      },
    })
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}