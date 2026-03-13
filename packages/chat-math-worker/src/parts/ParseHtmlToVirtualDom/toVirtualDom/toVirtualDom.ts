import { type VirtualDomNode, text } from '@lvce-editor/virtual-dom-worker'
import type { ReadonlyHtmlNode } from '../HtmlNodeTypes.ts'
import { getElementAttributes } from '../getElementAttributes/getElementAttributes.ts'
import { getElementType } from '../getElementType/getElementType.ts'

export const toVirtualDom = (node: ReadonlyHtmlNode): readonly VirtualDomNode[] => {
  if (node.type === 'text') {
    return [text(node.value)]
  }

  const children = node.children.flatMap(toVirtualDom)
  return [
    {
      childCount: node.children.length,
      ...getElementAttributes(node),
      type: getElementType(node.tagName),
    },
    ...children,
  ]
}
