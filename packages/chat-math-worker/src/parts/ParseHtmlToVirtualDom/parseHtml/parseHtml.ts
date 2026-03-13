import type { HtmlElementNode, HtmlNode } from '../HtmlNodeTypes.ts'
import { decodeEntities } from '../decodeEntities/decodeEntities.ts'
import { parseAttributes } from '../parseAttributes/parseAttributes.ts'
import { sanitizeHtml } from '../sanitizeHtml/sanitizeHtml.ts'

const tokenRegex = /<!--[\s\S]*?-->|<\/?[a-zA-Z][\w:-]*(?:\s[^<>]*?)?>|[^<]+/g
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
      const openTagNameMatch = /^<\s*([a-zA-Z][\w:-]*)/.exec(token)
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
