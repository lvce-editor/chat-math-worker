// cspell:ignore katex mathml notacommand

import { expect, test } from '@jest/globals'
import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getMathBlockDom } from '../src/parts/GetMathBlockDom/GetMathBlockDom.ts'
import { getMathInlineDom } from '../src/parts/GetMathInlineDom/GetMathInlineDom.ts'

const getClassNames = (nodes: readonly VirtualDomNode[]): readonly string[] => {
  return nodes.flatMap((node) => {
    if ('className' in node && typeof node.className === 'string') {
      return [node.className]
    }
    return []
  })
}

const getTextNodes = (nodes: readonly VirtualDomNode[]): readonly string[] => {
  return nodes.flatMap((node) => {
    if ('text' in node && typeof node.text === 'string') {
      return [node.text]
    }
    return []
  })
}

const expectKatexNodes = (nodes: readonly VirtualDomNode[]): void => {
  expect(getClassNames(nodes)).toEqual(expect.arrayContaining(['katex', 'katex-mathml', 'katex-html']))
}

test('getMathInlineDom renders valid inline math', () => {
  const result = getMathInlineDom({
    displayMode: false,
    text: 'x^2 + y^2',
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expectKatexNodes(result)
})

test('getMathInlineDom exposes original source in the rendered annotation', () => {
  const expression = 'x^2 + y^2'
  const result = getMathInlineDom({
    displayMode: false,
    text: expression,
    type: 'math-inline',
  })

  expect(getTextNodes(result)).toContain(expression)
})

test('getMathInlineDom renders valid display-mode inline math', () => {
  const expression = '\\frac{1}{2}'
  const result = getMathInlineDom({
    displayMode: true,
    text: expression,
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expect(getClassNames(result)).toEqual(expect.arrayContaining(['katex-display', 'katex', 'katex-mathml', 'katex-html']))
  expect(getTextNodes(result)).toContain(expression)
})

test('getMathInlineDom renders text commands without falling back', () => {
  const result = getMathInlineDom({
    displayMode: false,
    text: '\\text{hello world}',
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expect(getTextNodes(result).map((text) => text.replaceAll('\u00A0', ' '))).toContain('hello world')
})

test('getMathInlineDom falls back to single-dollar text for invalid inline math', () => {
  const result = getMathInlineDom({
    displayMode: false,
    text: '\\frac{1',
    type: 'math-inline',
  })

  expect(result).toHaveLength(1)
  expect(result[0]).toMatchObject({
    text: '$\\frac{1$',
  })
})

test('getMathInlineDom falls back to double-dollar text when display mode is true', () => {
  const result = getMathInlineDom({
    displayMode: true,
    text: '\\frac{1',
    type: 'math-inline',
  })

  expect(result).toHaveLength(1)
  expect(result[0]).toMatchObject({
    text: '$$\\frac{1$$',
  })
})

test('getMathInlineDom fallback preserves the original invalid command text', () => {
  const input = '\\notacommand{value}'
  const result = getMathInlineDom({
    displayMode: false,
    text: input,
    type: 'math-inline',
  })

  expect(result).toEqual([
    expect.objectContaining({
      text: `$${input}$`,
    }),
  ])
})

test('getMathInlineDom renders empty math without fallback', () => {
  const result = getMathInlineDom({
    displayMode: false,
    text: '',
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expectKatexNodes(result)
})

test('getMathBlockDom renders valid block math', () => {
  const expression = '\\int_0^1 x^2 dx'
  const result = getMathBlockDom({
    text: expression,
    type: 'math-block',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathBlock,
    type: VirtualDomElements.Div,
  })
  expect(getClassNames(result)).toEqual(expect.arrayContaining(['katex-display', 'katex', 'katex-mathml', 'katex-html']))
  expect(getTextNodes(result)).toContain(expression)
})

test('getMathBlockDom includes katex-display class in rendered block output', () => {
  const result = getMathBlockDom({
    text: 'x+y',
    type: 'math-block',
  })

  const hasKatexDisplayNode = result.some(
    (node) => 'className' in node && typeof node.className === 'string' && node.className.includes('katex-display'),
  )
  expect(hasKatexDisplayNode).toBe(true)
})

test('getMathBlockDom renders text content expressions without fallback', () => {
  const result = getMathBlockDom({
    text: '\\text{hello world}',
    type: 'math-block',
  })

  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathBlock,
    type: VirtualDomElements.Div,
  })
  expect(getTextNodes(result).map((text) => text.replaceAll('\u00A0', ' '))).toContain('hello world')
})

test('getMathBlockDom falls back to fenced math text for invalid input', () => {
  const result = getMathBlockDom({
    text: '\\frac{1',
    type: 'math-block',
  })

  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MarkdownMathBlock,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toMatchObject({
    text: '$$\n\\frac{1\n$$',
  })
})

test('getMathBlockDom fallback preserves original text content', () => {
  const input = '\\left( x + 1'
  const result = getMathBlockDom({
    text: input,
    type: 'math-block',
  })

  expect(result[1]).toMatchObject({
    text: `$$\n${input}\n$$`,
  })
})
