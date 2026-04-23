import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { useRuntimeConfig } from '#imports'

export const saveToSheet = async (row: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  const config = useRuntimeConfig()

  const serviceAccountAuth = new JWT({
    email: config.googleClientEmail,
    key: config.googlePrivateKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(config.googleSheetId, serviceAccountAuth)

  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[0]

  await sheet.addRow(row)
}