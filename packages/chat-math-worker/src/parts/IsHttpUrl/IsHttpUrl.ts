export const isHttpUrl = (url: string): boolean => {
  const normalized = url.trim().toLowerCase()
  return normalized.startsWith('http://') || normalized.startsWith('https://')
}
