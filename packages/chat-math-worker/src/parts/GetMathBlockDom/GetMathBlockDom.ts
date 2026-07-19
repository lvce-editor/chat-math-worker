import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { MessageMathBlockNode } from '../ParseMessageContentTypes/ParseMessageContentTypes.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { renderMath } from '../RenderMath/RenderMath.ts'

const fallbackMathBlockNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.MarkdownMathBlock,
  type: VirtualDomElements.Div,
}

export const getMathBlockDom = (node: MessageMathBlockNode): readonly VirtualDomNode[] => {
  const rendered = renderMath(node.text, true)
  if (!rendered) {
    return [fallbackMathBlockNode, text(`$$\n${node.text}\n$$`)]
  }
  return [
    {
      childCount: rendered.rootChildCount,
      className: ClassNames.MarkdownMathBlock,
      type: VirtualDomElements.Div,
    },
    ...rendered.virtualDom,
  ]
}
