import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

const inlineTags = new Set(['a', 'abbr', 'b', 'code', 'em', 'i', 'label', 'small', 'span', 'strong', 'sub', 'sup', 'u'])

const tagNameToElementType = {
  a: VirtualDomElements.A,
  abbr: VirtualDomElements.Abbr,
  article: VirtualDomElements.Article,
  aside: VirtualDomElements.Aside,
  audio: VirtualDomElements.Audio,
  br: VirtualDomElements.Br,
  button: VirtualDomElements.Button,
  code: VirtualDomElements.Code,
  col: VirtualDomElements.Col,
  colgroup: VirtualDomElements.ColGroup,
  dd: VirtualDomElements.Dd,
  dl: VirtualDomElements.Dl,
  dt: VirtualDomElements.Dt,
  em: VirtualDomElements.Em,
  figcaption: VirtualDomElements.Figcaption,
  figure: VirtualDomElements.Figure,
  footer: VirtualDomElements.Footer,
  h1: VirtualDomElements.H1,
  h2: VirtualDomElements.H2,
  h3: VirtualDomElements.H3,
  h4: VirtualDomElements.H4,
  h5: VirtualDomElements.H5,
  h6: VirtualDomElements.H6,
  header: VirtualDomElements.Header,
  hr: VirtualDomElements.Hr,
  i: VirtualDomElements.I,
  img: VirtualDomElements.Img,
  input: VirtualDomElements.Input,
  label: VirtualDomElements.Label,
  li: VirtualDomElements.Li,
  main: VirtualDomElements.Main,
  nav: VirtualDomElements.Nav,
  ol: VirtualDomElements.Ol,
  option: VirtualDomElements.Option,
  p: VirtualDomElements.P,
  pre: VirtualDomElements.Pre,
  section: VirtualDomElements.Section,
  select: VirtualDomElements.Select,
  span: VirtualDomElements.Span,
  strong: VirtualDomElements.Strong,
  table: VirtualDomElements.Table,
  tbody: VirtualDomElements.TBody,
  td: VirtualDomElements.Td,
  textarea: VirtualDomElements.TextArea,
  tfoot: VirtualDomElements.Tfoot,
  th: VirtualDomElements.Th,
  thead: VirtualDomElements.THead,
  tr: VirtualDomElements.Tr,
  ul: VirtualDomElements.Ul,
} as const satisfies Record<string, number>

const isKnownTagName = (tagName: string): tagName is keyof typeof tagNameToElementType => {
  return tagName in tagNameToElementType
}

export const getElementType = (tagName: string): number => {
  if (isKnownTagName(tagName)) {
    return tagNameToElementType[tagName]
  }
  return inlineTags.has(tagName) ? VirtualDomElements.Span : VirtualDomElements.Div
}
