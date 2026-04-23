import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL!,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

export async function saveToSheet(data: any) {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)

  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[0]

  await sheet.addRow({
    name: data.name,
    email: data.email,
    country: data.country,
    product: data.product,
    message: data.message,
    time: data.time
  })
}