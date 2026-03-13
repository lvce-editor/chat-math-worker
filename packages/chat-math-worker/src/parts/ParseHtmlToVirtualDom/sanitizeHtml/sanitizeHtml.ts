const maxHtmlLength = 40_000

export const sanitizeHtml = (value: string): string => {
  return value
    .slice(0, maxHtmlLength)
    .replaceAll(/<script\b[\s\S]*?<\/script>/gi, '')
    .replaceAll(/<style\b[\s\S]*?<\/style>/gi, '')
    .replaceAll(/<head\b[\s\S]*?<\/head>/gi, '')
    .replaceAll(/<meta\b[^>]*>/gi, '')
    .replaceAll(/<link\b[^>]*>/gi, '')
}
