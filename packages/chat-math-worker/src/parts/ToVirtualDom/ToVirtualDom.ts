import { type VirtualDomNode, text } from '@lvce-editor/virtual-dom-worker'
import type { ReadonlyHtmlNode } from '../ReadonlyHtmlNode/ReadonlyHtmlNode.ts'
import { getElementAttributes } from '../GetElementAttributes/GetElementAttributes.ts'
import { getElementType } from '../GetElementType/GetElementType.ts'

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
