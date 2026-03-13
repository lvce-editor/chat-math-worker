import { isHttpUrl } from '../IsHttpUrl/IsHttpUrl.ts'

export const normalizeUrl = (url: string): string => {
  return isHttpUrl(url) ? url : '#'
}
