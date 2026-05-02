import { decodeEntities } from '../DecodeEntities/DecodeEntities.ts'

const openingTagRegex = /^<\/?\s*[a-zA-Z][\w:-]*/
const closingBracketRegex = /\/?\s*>$/

const isWhitespace = (value: string): boolean => {
  return /\s/.test(value)
}

const isAttributeNameTerminator = (value: string): boolean => {
  return value === '=' || value === '/' || value === '>' || isWhitespace(value)
}

const isUnquotedValueTerminator = (value: string): boolean => {
  return value === '>' || isWhitespace(value)
}

export const parseAttributes = (token: string): Record<string, string> => {
  const withoutTag = token.replace(openingTagRegex, '').replace(closingBracketRegex, '').trim()

  if (!withoutTag) {
    return Object.create(null) as Record<string, string>
  }

  const attributes: Record<string, string> = Object.create(null) as Record<string, string>
  let index = 0

  while (index < withoutTag.length) {
    while (index < withoutTag.length && isWhitespace(withoutTag[index])) {
      index += 1
    }

    const nameStart = index
    while (index < withoutTag.length && !isAttributeNameTerminator(withoutTag[index])) {
      index += 1
    }

    const name = withoutTag.slice(nameStart, index).toLowerCase()
    if (!name || name.startsWith('on')) {
      while (index < withoutTag.length && !isWhitespace(withoutTag[index])) {
        index += 1
      }
      continue
    }

    while (index < withoutTag.length && isWhitespace(withoutTag[index])) {
      index += 1
    }

    let value = ''
    if (withoutTag[index] === '=') {
      index += 1
      while (index < withoutTag.length && isWhitespace(withoutTag[index])) {
        index += 1
      }

      const quote = withoutTag[index]
      if (quote === '"' || quote === "'") {
        index += 1
        const valueStart = index
        while (index < withoutTag.length && withoutTag[index] !== quote) {
          index += 1
        }
        value = withoutTag.slice(valueStart, index)
        if (index < withoutTag.length) {
          index += 1
        }
      } else {
        const valueStart = index
        while (index < withoutTag.length && !isUnquotedValueTerminator(withoutTag[index])) {
          index += 1
        }
        value = withoutTag.slice(valueStart, index)
      }
    }

    attributes[name] = decodeEntities(value)
  }

  return attributes
}
