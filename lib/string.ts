export const isProbablyEncrypted = (text: string) => {
  return /^gAAAA/.test(text) && text.length > 50
}
