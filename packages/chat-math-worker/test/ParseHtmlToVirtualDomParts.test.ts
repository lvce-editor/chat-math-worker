import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { decodeEntities } from '../src/parts/DecodeEntities/DecodeEntities.ts'
import { getElementAttributes } from '../src/parts/GetElementAttributes/GetElementAttributes.ts'
import { getElementType } from '../src/parts/GetElementType/GetElementType.ts'
import { normalizeUrl } from '../src/parts/NormalizeUrl/NormalizeUrl.ts'
import { parseAttributes } from '../src/parts/ParseAttributes/ParseAttributes.ts'
import { parseHtml } from '../src/parts/ParseHtml/ParseHtml.ts'
import { sanitizeHtml } from '../src/parts/SanitizeHtml/SanitizeHtml.ts'
import { toVirtualDom } from '../src/parts/ToVirtualDom/ToVirtualDom.ts'

test('decodeEntities should decode known HTML entities', () => {
  const result = decodeEntities('&lt;div&gt;Tom &amp; Jerry&nbsp;&quot;Hi&quot;&#39;!')

  expect(result).toBe('<div>Tom & Jerry "Hi"\'!')
})

test('sanitizeHtml should remove script style and head tags', () => {
  const result = sanitizeHtml('<head><meta charset="utf-8"></head><script>window.hack=1</script><style>body{}</style><p>ok</p>')

  expect(result).toBe('<p>ok</p>')
})

test('parseAttributes should ignore event handlers and decode values', () => {
  const result = parseAttributes('<a href="https://example.com?a=1&amp;b=2" onclick="alert(1)" data-id="x">')

  expect(result).toEqual({
    'data-id': 'x',
    href: 'https://example.com?a=1&b=2',
  })
})

test('parseHtml should return top-level nodes and ignore comments', () => {
  const result = parseHtml('<!-- ignored --><div>One</div><span>Two</span>')

  expect(result).toHaveLength(2)
  expect(result[0]).toMatchObject({
    tagName: 'div',
    type: 'element',
  })
  expect(result[1]).toMatchObject({
    tagName: 'span',
    type: 'element',
  })
})

test('normalizeUrl should keep only http(s) urls', () => {
  expect(normalizeUrl('https://example.com')).toBe('https://example.com')
  expect(normalizeUrl(' http://example.com ')).toBe(' http://example.com ')
  expect(normalizeUrl('javascript:alert(1)')).toBe('#')
})

test('parseAttributes should support single quoted unquoted and boolean attributes', () => {
  const result = parseAttributes('<input VALUE=test title=\'Tom &amp; Jerry\' disabled readonly onFocus="x">')

  expect(result).toEqual({
    disabled: '',
    readonly: '',
    title: 'Tom & Jerry',
    value: 'test',
  })
})

test('parseAttributes should return an empty object when there are no attributes', () => {
  const result = parseAttributes('<div>')

  expect(result).toEqual(Object.create(null))
})

test('parseHtml should return an empty array for empty input', () => {
  const result = parseHtml('')

  expect(result).toEqual([])
})

test('parseHtml should handle void elements self closing tags and mismatched closing tags', () => {
  const result = parseHtml('<div><img src="https://example.com/image.png" /><br>Tom &amp; Jerry</span></div>')

  expect(result).toEqual([
    {
      attributes: Object.create(null),
      children: [
        {
          attributes: {
            src: 'https://example.com/image.png',
          },
          children: [],
          tagName: 'img',
          type: 'element',
        },
        {
          attributes: Object.create(null),
          children: [],
          tagName: 'br',
          type: 'element',
        },
        {
          type: 'text',
          value: 'Tom & Jerry',
        },
      ],
      tagName: 'div',
      type: 'element',
    },
  ])
})

test('getElementType should map all supported html tags', () => {
  const cases = [
    ['a', VirtualDomElements.A],
    ['abbr', VirtualDomElements.Abbr],
    ['article', VirtualDomElements.Article],
    ['aside', VirtualDomElements.Aside],
    ['audio', VirtualDomElements.Audio],
    ['br', VirtualDomElements.Br],
    ['button', VirtualDomElements.Button],
    ['code', VirtualDomElements.Code],
    ['col', VirtualDomElements.Col],
    ['colgroup', VirtualDomElements.ColGroup],
    ['dd', VirtualDomElements.Dd],
    ['dl', VirtualDomElements.Dl],
    ['dt', VirtualDomElements.Dt],
    ['em', VirtualDomElements.Em],
    ['figcaption', VirtualDomElements.Figcaption],
    ['figure', VirtualDomElements.Figure],
    ['footer', VirtualDomElements.Footer],
    ['h1', VirtualDomElements.H1],
    ['h2', VirtualDomElements.H2],
    ['h3', VirtualDomElements.H3],
    ['h4', VirtualDomElements.H4],
    ['h5', VirtualDomElements.H5],
    ['h6', VirtualDomElements.H6],
    ['header', VirtualDomElements.Header],
    ['hr', VirtualDomElements.Hr],
    ['i', VirtualDomElements.I],
    ['img', VirtualDomElements.Img],
    ['input', VirtualDomElements.Input],
    ['label', VirtualDomElements.Label],
    ['li', VirtualDomElements.Li],
    ['main', VirtualDomElements.Main],
    ['nav', VirtualDomElements.Nav],
    ['ol', VirtualDomElements.Ol],
    ['option', VirtualDomElements.Option],
    ['p', VirtualDomElements.P],
    ['pre', VirtualDomElements.Pre],
    ['section', VirtualDomElements.Section],
    ['select', VirtualDomElements.Select],
    ['span', VirtualDomElements.Span],
    ['strong', VirtualDomElements.Strong],
    ['table', VirtualDomElements.Table],
    ['tbody', VirtualDomElements.TBody],
    ['td', VirtualDomElements.Td],
    ['textarea', VirtualDomElements.TextArea],
    ['tfoot', VirtualDomElements.Tfoot],
    ['th', VirtualDomElements.Th],
    ['thead', VirtualDomElements.THead],
    ['tr', VirtualDomElements.Tr],
    ['ul', VirtualDomElements.Ul],
  ] as const

  for (const [tagName, expected] of cases) {
    expect(getElementType(tagName)).toBe(expected)
  }
})

test('getElementType should map known and fallback tags', () => {
  expect(getElementType('table')).toBe(VirtualDomElements.Table)
  expect(getElementType('b')).toBe(VirtualDomElements.Span)
  expect(getElementType('small')).toBe(VirtualDomElements.Span)
  expect(getElementType('sub')).toBe(VirtualDomElements.Span)
  expect(getElementType('sup')).toBe(VirtualDomElements.Span)
  expect(getElementType('u')).toBe(VirtualDomElements.Span)
  expect(getElementType('custom-tag')).toBe(VirtualDomElements.Div)
})

test('getElementAttributes should map and sanitize element attributes', () => {
  const result = getElementAttributes({
    attributes: {
      checked: 'true',
      class: 'x',
      disabled: 'false',
      href: 'javascript:alert(1)',
      readonly: 'true',
      src: 'https://example.com/image.png',
    },
    children: [],
    tagName: 'a',
    type: 'element',
  })

  expect(result).toEqual({
    checked: true,
    className: 'x',
    disabled: false,
    href: '#',
    readOnly: true,
    src: 'https://example.com/image.png',
  })
})

test('getElementAttributes should map the remaining supported attributes', () => {
  const result = getElementAttributes({
    attributes: {
      classname: 'card',
      id: 'item-1',
      name: 'email',
      placeholder: 'name@example.com',
      rel: 'noopener',
      style: 'display:block',
      target: '_blank',
      title: 'Email',
      value: 'user@example.com',
    },
    children: [],
    tagName: 'input',
    type: 'element',
  })

  expect(result).toEqual({
    className: 'card',
    id: 'item-1',
    name: 'email',
    placeholder: 'name@example.com',
    rel: 'noopener',
    style: 'display:block',
    target: '_blank',
    title: 'Email',
    value: 'user@example.com',
  })
})

test('getElementAttributes should treat present boolean attributes as true by default', () => {
  const result = getElementAttributes({
    attributes: {
      checked: '',
      disabled: '',
      readonly: '',
    },
    children: [],
    tagName: 'input',
    type: 'element',
  })

  expect(result).toEqual({
    checked: true,
    disabled: true,
    readOnly: true,
  })
})

test('getElementAttributes should return an empty object for unsupported attributes', () => {
  const result = getElementAttributes({
    attributes: {
      alt: 'Preview',
      role: 'button',
    },
    children: [],
    tagName: 'img',
    type: 'element',
  })

  expect(result).toEqual({})
})

test('toVirtualDom should flatten nodes in pre-order', () => {
  const result = toVirtualDom({
    attributes: {
      class: 'x',
    },
    children: [
      {
        type: 'text',
        value: 'One',
      },
    ],
    tagName: 'div',
    type: 'element',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: 'x',
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toMatchObject({
    text: 'One',
  })
})
