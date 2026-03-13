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

test('getElementType should map known and fallback tags', () => {
  expect(getElementType('table')).toBe(VirtualDomElements.Table)
  expect(getElementType('b')).toBe(VirtualDomElements.Span)
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
