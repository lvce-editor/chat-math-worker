import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { parseHtml } from '../parseHtml/parseHtml.ts'
import { toVirtualDom } from '../toVirtualDom/toVirtualDom.ts'

export const parseHtmlToVirtualDomWithRootCount = (
  value: string,
): { readonly rootChildCount: number; readonly virtualDom: readonly VirtualDomNode[] } => {
  const rootNodes = parseHtml(value)
  return {
    rootChildCount: rootNodes.length,
    virtualDom: rootNodes.flatMap(toVirtualDom),
  }
}