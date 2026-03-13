import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

const inlineTags = new Set(['a', 'abbr', 'b', 'code', 'em', 'i', 'label', 'small', 'span', 'strong', 'sub', 'sup', 'u'])

export const getElementType = (tagName: string): number => {
  switch (tagName) {
    case 'a':
      return VirtualDomElements.A
    case 'abbr':
      return VirtualDomElements.Abbr
    case 'article':
      return VirtualDomElements.Article
    case 'aside':
      return VirtualDomElements.Aside
    case 'audio':
      return VirtualDomElements.Audio
    case 'br':
      return VirtualDomElements.Br
    case 'button':
      return VirtualDomElements.Button
    case 'code':
      return VirtualDomElements.Code
    case 'col':
      return VirtualDomElements.Col
    case 'colgroup':
      return VirtualDomElements.ColGroup
    case 'dd':
      return VirtualDomElements.Dd
    case 'dl':
      return VirtualDomElements.Dl
    case 'dt':
      return VirtualDomElements.Dt
    case 'em':
      return VirtualDomElements.Em
    case 'figcaption':
      return VirtualDomElements.Figcaption
    case 'figure':
      return VirtualDomElements.Figure
    case 'footer':
      return VirtualDomElements.Footer
    case 'h1':
      return VirtualDomElements.H1
    case 'h2':
      return VirtualDomElements.H2
    case 'h3':
      return VirtualDomElements.H3
    case 'h4':
      return VirtualDomElements.H4
    case 'h5':
      return VirtualDomElements.H5
    case 'h6':
      return VirtualDomElements.H6
    case 'header':
      return VirtualDomElements.Header
    case 'hr':
      return VirtualDomElements.Hr
    case 'i':
      return VirtualDomElements.I
    case 'img':
      return VirtualDomElements.Img
    case 'input':
      return VirtualDomElements.Input
    case 'label':
      return VirtualDomElements.Label
    case 'li':
      return VirtualDomElements.Li
    case 'main':
      return VirtualDomElements.Main
    case 'nav':
      return VirtualDomElements.Nav
    case 'ol':
      return VirtualDomElements.Ol
    case 'option':
      return VirtualDomElements.Option
    case 'p':
      return VirtualDomElements.P
    case 'pre':
      return VirtualDomElements.Pre
    case 'section':
      return VirtualDomElements.Section
    case 'select':
      return VirtualDomElements.Select
    case 'span':
      return VirtualDomElements.Span
    case 'strong':
      return VirtualDomElements.Strong
    case 'table':
      return VirtualDomElements.Table
    case 'tbody':
      return VirtualDomElements.TBody
    case 'td':
      return VirtualDomElements.Td
    case 'textarea':
      return VirtualDomElements.TextArea
    case 'tfoot':
      return VirtualDomElements.Tfoot
    case 'th':
      return VirtualDomElements.Th
    case 'thead':
      return VirtualDomElements.THead
    case 'tr':
      return VirtualDomElements.Tr
    case 'ul':
      return VirtualDomElements.Ul
    default:
      return inlineTags.has(tagName) ? VirtualDomElements.Span : VirtualDomElements.Div
  }
}