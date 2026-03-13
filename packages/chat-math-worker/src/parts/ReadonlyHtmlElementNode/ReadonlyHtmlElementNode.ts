import type { ReadonlyHtmlNode } from '../ReadonlyHtmlNode/ReadonlyHtmlNode.ts'

export type ReadonlyHtmlElementNode = {
  readonly attributes: Readonly<Record<string, string>>
  readonly children: readonly ReadonlyHtmlNode[]
  readonly tagName: string
  readonly type: 'element'
}
