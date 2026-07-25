import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'
import * as regex from '@lvce-editor/eslint-plugin-regex'

export default [
  ...config.default,
  ...config.recommendedVirtualDom,
  ...actions.default,
  ...tsconfig.default,
  ...regex.default,
  {
    rules: {
      'tsconfig/dont-skip-lib-check': 'off',
    },
  },
  {
    files: ['packages/chat-math-worker/src/parts/ParseHtml/ParseHtml.ts', 'packages/chat-math-worker/test/ParseHtmlToVirtualDomParts.test.ts'],
    rules: {
      'virtual-dom/no-object-attribute-values': 'off',
    },
  },
  {
    files: ['packages/chat-math-worker/test/ParseHtmlToVirtualDom.test.ts'],
    rules: {
      'virtual-dom/secure-links': 'off',
    },
  },
]
