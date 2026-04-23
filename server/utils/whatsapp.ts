export function generateWhatsAppLink(params: {
  phone: string
  name: string
  country?: string
  product?: string
  message?: string
}) {
  const text = `
New Inquiry:
Name: ${params.name}
Country: ${params.country || '-'}
Product: ${params.product || '-'}
Message: ${params.message || '-'}
`

  return `https://wa.me/${params.phone}?text=${encodeURIComponent(text)}`
}