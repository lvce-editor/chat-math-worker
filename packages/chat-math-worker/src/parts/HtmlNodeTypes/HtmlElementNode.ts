import type { HtmlNode } from './HtmlNode.ts'

export interface HtmlElementNode {
  readonly attributes: Record<string, string>
  readonly children: HtmlNode[]
  readonly tagName: string
  readonly type: 'element'
}
