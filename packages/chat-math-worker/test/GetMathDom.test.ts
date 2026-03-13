// cspell:ignore katex

import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getMathBlockDom, getMathInlineDom } from '../src/parts/GetMathDom/GetMathDom.ts'

test('getMathInlineDom renders valid inline math', () => {
  const result = getMathInlineDom({
    displayMode: false,
    text: 'x^2 + y^2',
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: expect.any(Number),
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expect(result.length).toBeGreaterThan(1)
})

test('getMathInlineDom renders valid display-mode inline math', () => {
  const result = getMathInlineDom({
    displayMode: true,
    text: '\\frac{1}{2}',
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: expect.any(Number),
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expect(result.length).toBeGreaterThan(1)
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

test('getMathInlineDom renders empty math without fallback', () => {
  const result = getMathInlineDom({
    displayMode: false,
    text: '',
    type: 'math-inline',
  })

  expect(result[0]).toEqual({
    childCount: expect.any(Number),
    className: ClassNames.MarkdownMathInline,
    type: VirtualDomElements.Span,
  })
  expect(result.length).toBeGreaterThan(1)
})

test('getMathBlockDom renders valid block math', () => {
  const result = getMathBlockDom({
    text: '\\int_0^1 x^2 dx',
    type: 'math-block',
  })

  expect(result[0]).toEqual({
    childCount: expect.any(Number),
    className: ClassNames.MarkdownMathBlock,
    type: VirtualDomElements.Div,
  })
  expect(result.length).toBeGreaterThan(1)
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
