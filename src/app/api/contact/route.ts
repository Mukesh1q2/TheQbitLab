import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

// Force dynamic rendering - prevents build-time data collection
export const dynamic = 'force-dynamic'

// Lazy load prisma to avoid build-time initialization issues
const getPrisma = async () => {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
})

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = ContactSchema.parse(body)

    // Save to database
    const prisma = await getPrisma()
    const contact = await prisma.inquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        message: validatedData.message,
        budget: validatedData.budget,
        timeline: validatedData.timeline,
        status: 'NEW',
      },
    })

    // Send notification email
    try {
      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'hello@theqbitlabs.com',
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
          ${validatedData.timeline ? `<p><strong>Timeline:</strong> ${validatedData.timeline}</p>` : ''}
          <hr>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails
    }

    // Send confirmation email to user
    try {
      await sendEmail({
        to: validatedData.email,
        subject: 'Thank you for contacting TheQbitlabs',
        html: `
          <h2>Thank you for your inquiry!</h2>
          <p>Hi ${validatedData.name},</p>
          <p>Thank you for reaching out to TheQbitlabs. We've received your message and will get back to you within 24 hours.</p>
          <p>Your inquiry details:</p>
          <ul>
            ${validatedData.company ? `<li><strong>Company:</strong> ${validatedData.company}</li>` : ''}
            ${validatedData.budget ? `<li><strong>Budget:</strong> ${validatedData.budget}</li>` : ''}
            ${validatedData.timeline ? `<li><strong>Timeline:</strong> ${validatedData.timeline}</li>` : ''}
          </ul>
          <p>Best regards,<br>TheQbitlabs Team</p>
        `,
      })
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
      contactId: contact.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    )
  }
}

// GET /api/contact - Get contact inquiries (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    if (status) {
      where.status = status
    }

    const prisma = await getPrisma()
    const contacts = await prisma.inquiry.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.inquiry.count({ where })

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}