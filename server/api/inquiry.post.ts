import { sendEmail } from '~/server/utils/email'
import { saveToSheet } from '~/server/utils/googleSheet'
import { generateWhatsAppLink } from '~/server/utils/whatsapp'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const inquiry = {
    name: body.name,
    email: body.email,
    country: body.country,
    product: body.product,
    message: body.message,
    time: new Date().toISOString()
  }

  // 1. 邮件
  await sendEmail(inquiry)

  // 2. 写入 Google Sheet
  await saveToSheet(inquiry)

  // 3. WhatsApp 链接
  const whatsappLink = generateWhatsAppLink({
    phone: process.env.WHATSAPP_PHONE || '8619743003775/8613066010625',
    ...inquiry
  })

  return {
    success: true,
    whatsappLink
  }
})