import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'
import * as tsconfig from '@lvce-editor/eslint-plugin-tsconfig'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedActions,
  ...tsconfig.default,
  ...config.recommendedRegex,
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
])
