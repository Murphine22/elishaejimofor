import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email to you (the website owner)
    const mailOptionsToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Message: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #4f46e5;">From:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #4f46e5;">Email:</strong> <a href="mailto:${email}" style="color: #4f46e5;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #4f46e5;">Subject:</strong> ${subject || 'No Subject'}</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong style="color: #4f46e5;">Message:</strong></p>
            <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>This email was sent from your portfolio website contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    }

    // Auto-reply to the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">Thank You for Reaching Out!</h2>
          
          <p style="color: #333; line-height: 1.6;">Hi ${name},</p>
          
          <p style="color: #333; line-height: 1.6;">
            Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong style="color: #4f46e5;">Your Message:</strong></p>
            <p style="margin: 10px 0; line-height: 1.6; color: #333;">${message}</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            I typically respond within 24-48 hours during business days.
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 16px; font-weight: bold;">Best Regards,</p>
            <p style="color: white; margin: 5px 0; font-size: 18px;">Elisha Ejimofor</p>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0; font-size: 14px;">Full Stack Developer</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px; text-align: center;">
            <p>📧 elishaejimofor@gmail.com | 📱 +234 816 058 9186</p>
            <p>📍 Abuja, Nigeria</p>
          </div>
        </div>
      `,
    }

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner)
    await transporter.sendMail(mailOptionsToSender)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
