export interface HtmlTextNode {
  readonly type: 'text'
  readonly value: string
}

export interface HtmlElementNode {
  readonly attributes: Record<string, string>
  readonly children: HtmlNode[]
  readonly tagName: string
  readonly type: 'element'
}

export type HtmlNode = HtmlElementNode | HtmlTextNode

export type ReadonlyHtmlElementNode = {
  readonly attributes: Readonly<Record<string, string>>
  readonly children: readonly ReadonlyHtmlNode[]
  readonly tagName: string
  readonly type: 'element'
}

export type ReadonlyHtmlNode = ReadonlyHtmlElementNode | HtmlTextNode