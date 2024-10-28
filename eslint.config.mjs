// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
})
  .append(
    {
      rules: {
        // Disable trailing commas
        'no-console': [
          process.env.NODE_ENV === 'production' ? 'error' : 'warn',
          { allow: ['error', 'warn'] }
        ],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        // UNICORN
        'unicorn/prefer-module': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: {
              setupDevToolsUI: true
            }
          }
        ]
      }
    }
  )
