import { Resend } from 'resend'

export async function sendEmail(data: any) {
  const config = useRuntimeConfig()

  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({
    from: 'Inquiry <onboarding@resend.dev>',
    to: config.googleClientEmail,
    subject: `New Inquiry from ${data.name}`,
    html: `
      <h2>New Inquiry</h2>

      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Country:</b> ${data.country}</p>
      <p><b>Product:</b> ${data.product}</p>

      <p><b>Message:</b></p>
      <p>${data.message}</p>
    `
  })
}