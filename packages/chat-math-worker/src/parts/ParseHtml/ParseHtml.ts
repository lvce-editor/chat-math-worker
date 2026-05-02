import type { HtmlElementNode } from '../HtmlElementNode/HtmlElementNode.ts'
import type { HtmlNode } from '../HtmlNode/HtmlNode.ts'
import { decodeEntities } from '../DecodeEntities/DecodeEntities.ts'
import { parseAttributes } from '../ParseAttributes/ParseAttributes.ts'
import { sanitizeHtml } from '../SanitizeHtml/SanitizeHtml.ts'

const tokenRegex = /<!--[\s\S]*?-->|<\/?[a-zA-Z][\w:-]*(?:\s[^<>]*?)?>|[^<]+/g
const openTagNameRegex = /^<\s*([a-zA-Z][\w:-]*)/
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

const createRootNode = (): HtmlElementNode => {
  return {
    attributes: Object.create(null) as Record<string, string>,
    children: [],
    tagName: 'root',
    type: 'element',
  }
}

export const parseHtml = (value: string): readonly HtmlNode[] => {
  const root = createRootNode()
  const stack: HtmlElementNode[] = [root]

  const closeTag = (token: string): void => {
    const closingTagName = token.slice(2, -1).trim().toLowerCase()
    while (stack.length > 1) {
      const top = stack.at(-1)
      if (!top) {
        return
      }
      stack.pop()
      if (top.tagName === closingTagName) {
        return
      }
    }
  }

  const openTag = (token: string): void => {
    const openTagNameMatch = openTagNameRegex.exec(token)
    if (!openTagNameMatch) {
      return
    }

    const tagName = openTagNameMatch[1].toLowerCase()
    const parent = stack.at(-1)
    if (!parent) {
      return
    }

    const elementNode: HtmlElementNode = {
      attributes: parseAttributes(token),
      children: [],
      tagName,
      type: 'element',
    }

    parent.children.push(elementNode)

    if (!token.endsWith('/>') && !voidElements.has(tagName)) {
      stack.push(elementNode)
    }
  }

  const appendTextNode = (token: string): void => {
    const decoded = decodeEntities(token)
    if (!decoded) {
      return
    }

    const parent = stack.at(-1)
    if (!parent) {
      return
    }

    parent.children.push({
      type: 'text',
      value: decoded,
    })
  }

  const matches = sanitizeHtml(value).match(tokenRegex)
  if (!matches) {
    return []
  }

  for (const token of matches) {
    if (token.startsWith('<!--')) {
      continue
    }

    if (token.startsWith('</')) {
      closeTag(token)
      continue
    }

    if (token.startsWith('<')) {
      openTag(token)
      continue
    }

    appendTextNode(token)
  }

  return root.children
}
