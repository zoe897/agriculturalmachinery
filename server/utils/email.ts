import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data) {
  await resend.emails.send({
    from: 'HECOTH <inquiry@yourdomain.com>',
    to: 'your-email@gmail.com',
    subject: `New Inquiry - ${data.product}`,
    html: `
      <h2>New Inquiry</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Country:</b> ${data.country}</p>
      <p><b>Product:</b> ${data.product}</p>
      <p><b>Message:</b> ${data.message}</p>
      <p><b>Time:</b> ${data.time}</p>
    `
  })
}