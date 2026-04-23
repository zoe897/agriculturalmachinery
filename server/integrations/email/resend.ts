import { Resend } from 'resend'
import { useRuntimeConfig } from '#imports'

export const sendEmail = async (data: {
  to: string
  subject: string
  message: string
}) => {
  const config = useRuntimeConfig()

  const resend = new Resend(config.resendApiKey)

  await resend.emails.send({
    from: 'SaaS <onboarding@yourdomain.com>',
    to: data.to,
    subject: data.subject,
    text: data.message,
  })
}