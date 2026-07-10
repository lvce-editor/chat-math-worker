import { decodeEntities } from '../DecodeEntities/DecodeEntities.ts'

const openingTagRegex = /^<\/?\s*[a-zA-Z][\w:-]*/
// eslint-disable-next-line sonarjs/super-linear-regex
const closingBracketRegex = /\/?\s*>$/
const whitespaceRegex = /\s/

const isWhitespace = (value: string): boolean => {
  return whitespaceRegex.test(value)
}

const isAttributeNameTerminator = (value: string): boolean => {
  return value === '=' || value === '/' || value === '>' || isWhitespace(value)
}

const isUnquotedValueTerminator = (value: string): boolean => {
  return value === '>' || isWhitespace(value)
}

const skipWhitespace = (value: string, index: number): number => {
  let nextIndex = index
  while (nextIndex < value.length && isWhitespace(value[nextIndex])) {
    nextIndex += 1
  }
  return nextIndex
}

const readAttributeName = (value: string, index: number): readonly [string, number] => {
  let nextIndex = index
  while (nextIndex < value.length && !isAttributeNameTerminator(value[nextIndex])) {
    nextIndex += 1
  }
  return [value.slice(index, nextIndex).toLowerCase(), nextIndex]
}

const skipAttributeValue = (value: string, index: number): number => {
  let nextIndex = skipWhitespace(value, index)
  if (value[nextIndex] !== '=') {
    return nextIndex
  }

  nextIndex = skipWhitespace(value, nextIndex + 1)
  const quote = value[nextIndex]
  if (quote === '"' || quote === "'") {
    nextIndex += 1
    while (nextIndex < value.length && value[nextIndex] !== quote) {
      nextIndex += 1
    }
    return nextIndex < value.length ? nextIndex + 1 : nextIndex
  }

  while (nextIndex < value.length && !isUnquotedValueTerminator(value[nextIndex])) {
    nextIndex += 1
  }
  return nextIndex
}

const readAttributeValue = (value: string, index: number): readonly [string, number] => {
  let nextIndex = skipWhitespace(value, index)
  if (value[nextIndex] !== '=') {
    return ['', nextIndex]
  }

  nextIndex = skipWhitespace(value, nextIndex + 1)
  const quote = value[nextIndex]
  if (quote === '"' || quote === "'") {
    const valueStart = nextIndex + 1
    nextIndex = valueStart
    while (nextIndex < value.length && value[nextIndex] !== quote) {
      nextIndex += 1
    }
    const attributeValue = value.slice(valueStart, nextIndex)
    return [attributeValue, nextIndex < value.length ? nextIndex + 1 : nextIndex]
  }

  const valueStart = nextIndex
  while (nextIndex < value.length && !isUnquotedValueTerminator(value[nextIndex])) {
    nextIndex += 1
  }
  return [value.slice(valueStart, nextIndex), nextIndex]
}

export const parseAttributes = (token: string): Record<string, string> => {
  const withoutTag = token.replace(openingTagRegex, '').replace(closingBracketRegex, '').trim()

  if (!withoutTag) {
    return Object.create(null) as Record<string, string>
  }

  const attributes: Record<string, string> = Object.create(null) as Record<string, string>
  let index = 0

  while (index < withoutTag.length) {
    index = skipWhitespace(withoutTag, index)
    const [name, nextIndex] = readAttributeName(withoutTag, index)
    index = nextIndex

    if (!name || name.startsWith('on')) {
      index = skipAttributeValue(withoutTag, index)
      continue
    }

    const [attributeValue, nextValueIndex] = readAttributeValue(withoutTag, index)
    index = nextValueIndex
    const value = attributeValue
    attributes[name] = decodeEntities(value)
  }

  return attributes
}
