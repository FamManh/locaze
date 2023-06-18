/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@locaze/eslint-config/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('@locaze/eslint-config/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@locaze/eslint-config/typescript',
    '@locaze/eslint-config/sonar',
    '@locaze/eslint-config/regexp',
    '@locaze/eslint-config/jest',
    '@locaze/eslint-config/react',
    '@locaze/eslint-config/tailwind',
    '@locaze/eslint-config/rtl',
    // Apply prettier and disable incompatible rules
    '@locaze/eslint-config/prettier',
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'off' }],
  },
  overrides: [
    {
      files: ['tailwind.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
