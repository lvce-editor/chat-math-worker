// cspell:ignore katex

import { type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import katex from 'katex'
import { parseHtmlToVirtualDomWithRootCount } from '../ParseHtmlToVirtualDom/ParseHtmlToVirtualDom.ts'

export const renderMath = (
  value: string,
  displayMode: boolean,
): { readonly rootChildCount: number; readonly virtualDom: readonly VirtualDomNode[] } | undefined => {
  try {
    const html = katex.renderToString(value, {
      displayMode,
      throwOnError: true,
    })
    return parseHtmlToVirtualDomWithRootCount(html)
  } catch {
    return undefined
  }
}
