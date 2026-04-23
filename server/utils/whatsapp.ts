export function generateWhatsAppLink({
  phone,
  name,
  country,
  product,
  message
}: {
  phone: string
  name?: string
  country?: string
  product?: string
  message?: string
}) {
  
  const text = `
Hello, I am interested in your products.

Name: ${name || "N/A"}
Country: ${country || "N/A"}
Product: ${product || "General Inquiry"}
Message: ${message || "Please send me details and price."}

Please reply with your best offer.
  `.trim()

  const encodedText = encodeURIComponent(text)

  return `https://wa.me/${phone}?text=${encodedText}`
}