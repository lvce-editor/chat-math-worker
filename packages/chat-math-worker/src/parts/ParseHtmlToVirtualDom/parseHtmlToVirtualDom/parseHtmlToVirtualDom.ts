import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { parseHtml } from '../parseHtml/parseHtml.ts'
import { toVirtualDom } from '../toVirtualDom/toVirtualDom.ts'

export const parseHtmlToVirtualDom = (value: string): readonly VirtualDomNode[] => {
  return parseHtml(value).flatMap(toVirtualDom)
}