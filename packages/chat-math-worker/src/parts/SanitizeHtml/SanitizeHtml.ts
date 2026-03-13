const maxHtmlLength = 40_000
const scriptTagRegex = /<script\b[\s\S]*?<\/script>/gi
const styleTagRegex = /<style\b[\s\S]*?<\/style>/gi
const headTagRegex = /<head\b[\s\S]*?<\/head>/gi
const metaTagRegex = /<meta\b[^>]*>/gi
const linkTagRegex = /<link\b[^>]*>/gi

export const sanitizeHtml = (value: string): string => {
  return value
    .slice(0, maxHtmlLength)
    .replaceAll(scriptTagRegex, '')
    .replaceAll(styleTagRegex, '')
    .replaceAll(headTagRegex, '')
    .replaceAll(metaTagRegex, '')
    .replaceAll(linkTagRegex, '')
}
