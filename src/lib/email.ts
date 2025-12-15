import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  attachments?: Array<{
    filename: string
    content: string | Buffer
    contentType?: string
  }>
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  // For development, we'll use a mock email service
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Mock Email Sent:')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('HTML:', options.html.substring(0, 200) + '...')
    return
  }

  // Production email configuration
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@theqbitlabs.com',
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments,
  })
}

// Newsletter email template
export function createNewsletterEmail(title: string, content: string, unsubscribeUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #8B5CF6; margin: 0;">TheQbitlabs</h1>
        <p style="margin: 5px 0; color: #666;">Technology Innovation Newsletter</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-top: 0;">${title}</h2>
        <div style="color: #555;">${content}</div>
      </div>
      
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 14px; margin: 0;">
          You received this email because you subscribed to TheQbitlabs newsletter.
        </p>
        <p style="color: #888; font-size: 14px; margin: 5px 0 0;">
          <a href="${unsubscribeUrl}" style="color: #8B5CF6; text-decoration: none;">
            Unsubscribe from this list
          </a>
        </p>
      </div>
    </body>
    </html>
  `
}

// Contact form email template
export function createContactEmail(data: {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #8B5CF6; margin: 0;">New Contact Form Submission</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        
        <h3 style="color: #333;">Project Details</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ''}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
        ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
        
        <h3 style="color: #333;">Message</h3>
        <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #8B5CF6;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #888; font-size: 14px; margin: 0;">
          This email was sent from the contact form on theqbitlabs.com
        </p>
      </div>
    </body>
    </html>
  `
}