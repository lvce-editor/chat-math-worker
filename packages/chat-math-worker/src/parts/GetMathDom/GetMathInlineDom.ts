import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { MessageMathInlineNode } from '../../ParseMessageContentTypes/ParseMessageContentTypes.ts'
import * as ClassNames from '../../ClassNames/ClassNames.ts'
import { renderMath } from './RenderMath.ts'

export const getMathInlineDom = (node: MessageMathInlineNode): readonly VirtualDomNode[] => {
  const rendered = renderMath(node.text, node.displayMode)
  if (!rendered) {
    const fallback = node.displayMode ? `$$${node.text}$$` : `$${node.text}$`
    return [text(fallback)]
  }
  return [
    {
      childCount: rendered.rootChildCount,
      className: ClassNames.MarkdownMathInline,
      type: VirtualDomElements.Span,
    },
    ...rendered.virtualDom,
  ]
}
