import type { HtmlElementNode } from '../HtmlNodeTypes/HtmlElementNode.ts'
import type { HtmlNode } from '../HtmlNodeTypes/HtmlNode.ts'
import { decodeEntities } from './DecodeEntities.ts'
import { parseAttributes } from './ParseAttributes.ts'
import { sanitizeHtml } from './SanitizeHtml.ts'

const tokenRegex = /<!--[\s\S]*?-->|<\/?[a-zA-Z][\w:-]*(?:\s[^<>]*?)?>|[^<]+/g
const openTagNameRegex = /^<\s*([a-zA-Z][\w:-]*)/
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

export const parseHtml = (value: string): readonly HtmlNode[] => {
  const root: HtmlElementNode = {
    attributes: Object.create(null) as Record<string, string>,
    children: [],
    tagName: 'root',
    type: 'element',
  }

  const stack: HtmlElementNode[] = [root]

  const matches = sanitizeHtml(value).match(tokenRegex)
  if (!matches) {
    return []
  }

  for (const token of matches) {
    if (token.startsWith('<!--')) {
      continue
    }

    if (token.startsWith('</')) {
      const closingTagName = token.slice(2, -1).trim().toLowerCase()
      while (stack.length > 1) {
        const top = stack.at(-1)
        if (!top) {
          break
        }
        stack.pop()
        if (top.tagName === closingTagName) {
          break
        }
      }
      continue
    }

    if (token.startsWith('<')) {
      const openTagNameMatch = openTagNameRegex.exec(token)
      if (!openTagNameMatch) {
        continue
      }
      const tagName = openTagNameMatch[1].toLowerCase()
      const elementNode: HtmlElementNode = {
        attributes: parseAttributes(token),
        children: [],
        tagName,
        type: 'element',
      }

      const parent = stack.at(-1)
      if (!parent) {
        continue
      }
      parent.children.push(elementNode)

      const selfClosing = token.endsWith('/>') || voidElements.has(tagName)
      if (!selfClosing) {
        stack.push(elementNode)
      }
      continue
    }

    const decoded = decodeEntities(token)
    if (!decoded) {
      continue
    }
    const parent = stack.at(-1)
    if (!parent) {
      continue
    }
    parent.children.push({
      type: 'text',
      value: decoded,
    })
  }

  return root.children
}
