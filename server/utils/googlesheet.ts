export async function saveToSheet(data) {
  await $fetch(process.env.GOOGLE_SHEET_URL, {
    method: 'POST',
    body: data
  })
}