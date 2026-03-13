import { decodeEntities } from '../decodeEntities/decodeEntities.ts'

const attributeRegex = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g
const openingTagRegex = /^<\/?\s*[a-zA-Z][\w:-]*/
const closingBracketRegex = /\/?\s*>$/

export const parseAttributes = (token: string): Record<string, string> => {
  const withoutTag = token
    .replace(openingTagRegex, '')
    .replace(closingBracketRegex, '')
    .trim()

  if (!withoutTag) {
    return Object.create(null) as Record<string, string>
  }

  const attributes: Record<string, string> = Object.create(null) as Record<string, string>
  const matches = withoutTag.matchAll(attributeRegex)

  for (const match of matches) {
    const name = String(match[1] || '').toLowerCase()
    if (!name || name.startsWith('on')) {
      continue
    }
    const value = String(match[2] ?? match[3] ?? match[4] ?? '')
    attributes[name] = decodeEntities(value)
  }

  return attributes
}
