// cspell:ignore katex mathml

import { expect, test } from '@jest/globals'
import { type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { renderMath } from '../src/parts/RenderMath/RenderMath.ts'

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

test('renderMath renders inline expressions to virtual dom with a single root', () => {
  const result = renderMath('x^2 + y^2', false)

  expect(result).toBeDefined()
  expect(result?.rootChildCount).toBe(1)
  expect(getClassNames(result?.virtualDom ?? [])).toEqual(expect.arrayContaining(['katex', 'katex-mathml', 'katex-html']))
  expect(getTextNodes(result?.virtualDom ?? [])).toContain('x^2 + y^2')
})

test('renderMath renders display expressions with katex-display output', () => {
  const expression = '\\frac{1}{2}'
  const result = renderMath(expression, true)

  expect(result).toBeDefined()
  expect(result?.rootChildCount).toBe(1)
  expect(getClassNames(result?.virtualDom ?? [])).toEqual(expect.arrayContaining(['katex-display', 'katex', 'katex-mathml', 'katex-html']))
  expect(getTextNodes(result?.virtualDom ?? [])).toContain(expression)
})

test('renderMath renders text commands and preserves visible text', () => {
  const result = renderMath('\\text{hello world}', false)

  expect(result).toBeDefined()
  expect(getTextNodes(result?.virtualDom ?? []).map((text) => text.replaceAll('\u00A0', ' '))).toContain('hello world')
})

test('renderMath renders empty expressions', () => {
  const result = renderMath('', false)

  expect(result).toBeDefined()
  expect(result?.rootChildCount).toBe(1)
})

test('renderMath returns undefined for invalid latex', () => {
  const result = renderMath('\\frac{1', false)

  expect(result).toBeUndefined()
})
