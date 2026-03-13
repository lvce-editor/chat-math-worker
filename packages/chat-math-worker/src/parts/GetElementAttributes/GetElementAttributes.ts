import type { ReadonlyHtmlElementNode } from '../ReadonlyHtmlElementNode/ReadonlyHtmlElementNode.ts'
import { normalizeUrl } from '../NormalizeUrl/NormalizeUrl.ts'

export const getElementAttributes = (node: ReadonlyHtmlElementNode): Record<string, unknown> => {
  const attributes: Record<string, unknown> = {}
  const className = node.attributes.class || node.attributes.classname
  if (className) {
    attributes.className = className
  }
  if (node.attributes.style) {
    attributes.style = node.attributes.style
  }
  if (node.attributes.id) {
    attributes.id = node.attributes.id
  }
  if (node.attributes.name) {
    attributes.name = node.attributes.name
  }
  if (node.attributes.placeholder) {
    attributes.placeholder = node.attributes.placeholder
  }
  if (node.attributes.title) {
    attributes.title = node.attributes.title
  }
  if (node.attributes.value) {
    attributes.value = node.attributes.value
  }
  if (node.attributes.href) {
    attributes.href = normalizeUrl(node.attributes.href)
  }
  if (node.attributes.src) {
    attributes.src = normalizeUrl(node.attributes.src)
  }
  if (node.attributes.target) {
    attributes.target = node.attributes.target
  }
  if (node.attributes.rel) {
    attributes.rel = node.attributes.rel
  }
  if ('checked' in node.attributes) {
    attributes.checked = node.attributes.checked !== 'false'
  }
  if ('disabled' in node.attributes) {
    attributes.disabled = node.attributes.disabled !== 'false'
  }
  if ('readonly' in node.attributes) {
    attributes.readOnly = node.attributes.readonly !== 'false'
  }
  return attributes
}
