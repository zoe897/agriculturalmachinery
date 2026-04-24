export async function sendEmail(data: any) {
  const config = useRuntimeConfig()
  const { Resend } = await import('resend')

  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({
    from: 'Inquiry <onboarding@resend.dev>',
    to: config.googleClientEmail,
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