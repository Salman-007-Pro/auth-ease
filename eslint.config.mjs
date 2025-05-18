// Import necessary plugins and parsers
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactNativePlugin from 'eslint-plugin-react-native';
import globals from 'globals';

export default [
  {
    ignores: ['metro.config.js', 'babel.config.js', '.prettierrc.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.json', // ✅ Enables type-aware linting (like `tsc --noEmit`)
      },
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.node,
        ...globals.amd,
        ...globals.jest,
        ...globals.phantomjs,
        ...globals.couch,
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
        btoa: 'readonly',
        atob: 'readonly',
        React: 'readonly',
        require: 'readonly',
        NodeJS: 'readonly',
        JSX: 'readonly',
        URLSearchParams: 'readonly',
        clearInterval: 'readonly',
        setInterval: 'readonly',
        ReactNavigation: 'readonly',
        __DEV__: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-native': reactNativePlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
      // ✅ Enforce type checking rules (like `tsc --noEmit`)
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      // '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/prefer-find': 'error',

      // 'react/react-in-jsx-scope': 'off', // Since Expo (React 17+) doesn't need `import React`,
      'no-unused-vars': 'off', // ✅ Disables for JavaScript
      // '@typescript-eslint/no-unused-vars': 'off', // ✅ Disables for TypeScript,
      // 'no-unsafe-optional-chaining': 'off', // ✅ Disables for JavaScript
      'no-case-declarations': 'off', // ✅ Disables for JavaScript
      // 'no-useless-escape': 'off', // ✅ Disables for JavaScript
      // 'no-undef': 'off', // ✅ Disables for JavaScript
      'no-useless-catch': 'off', // ✅ Disables for JavaScript
    },
  },
  prettierConfig,
];