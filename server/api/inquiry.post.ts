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

  // 1. 邮件通知
  await sendEmail(inquiry)

  // 2. 写入 Google Sheet
  await saveToSheet(inquiry)

  // 3. 生成 WhatsApp 跳转链接（关键）
  const whatsappLink = generateWhatsAppLink({
    phone: "8619743003775/8613066010625",
    name: inquiry.name,
    country: inquiry.country,
    product: inquiry.product,
    message: inquiry.message
  })

  return {
    success: true,
    whatsappLink
  }
})