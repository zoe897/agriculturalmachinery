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

  await sendEmail(inquiry)
  await saveToSheet(inquiry)

  const whatsappLink = generateWhatsAppLink({
    phone: "8619743003775/8613066010625",
    name: body.name,
    country: body.country,
    product: body.product,
    message: body.message
  })

  return {
    success: true,
    whatsappLink
  }
})