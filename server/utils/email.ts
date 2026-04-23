import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendEmail(data: any) {
  await resend.emails.send({
    from: 'Inquiry <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL!,
    subject: `New Inquiry from ${data.name}`,
    html: `
      <h3>New Inquiry</h3>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Country:</b> ${data.country}</p>
      <p><b>Product:</b> ${data.product}</p>
      <p><b>Message:</b> ${data.message}</p>
    `
  })
}