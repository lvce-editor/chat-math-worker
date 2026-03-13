import { isHttpUrl } from '../isHttpUrl/isHttpUrl.ts'

export const normalizeUrl = (url: string): string => {
  return isHttpUrl(url) ? url : '#'
}