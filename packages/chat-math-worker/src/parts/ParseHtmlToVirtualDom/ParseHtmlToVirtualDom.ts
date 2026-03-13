import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { parseHtml } from '../ParseHtml/ParseHtml.ts'
import { toVirtualDom } from '../ToVirtualDom/ToVirtualDom.ts'

export const parseHtmlToVirtualDom = (value: string): readonly VirtualDomNode[] => {
  return parseHtml(value).flatMap(toVirtualDom)
}

export { parseHtmlToVirtualDomWithRootCount } from '../ParseHtmlToVirtualDomWithRootCount/ParseHtmlToVirtualDomWithRootCount.ts'
