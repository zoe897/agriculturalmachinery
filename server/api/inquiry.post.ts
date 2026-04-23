import { sendEmail } from '~/server/utils/email'
import { saveToSheet } from '~/server/utils/googleSheet'

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

  return {
    success: true
  }
})