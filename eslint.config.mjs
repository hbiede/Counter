import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import _import from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { fixupPluginRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores([
    'submodules/wedgekit/lib/*',
    '__tests__/*',
    'coverage/*',
    '**/babel.config.js',
  ]),
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ...react.configs.flat.recommended,
    settings: {
      ...(react.configs.flat.recommended.settings ?? {}),
      react: {
        version: 'detect',
      },
    },
  },
  typescriptEslint.configs['flat/eslint-recommended'],
  typescriptEslint.configs['flat/recommended'],
  typescriptEslint.configs['flat/recommended-type-checked'],
  {
    plugins: {
      react,
      import: fixupPluginRules(_import),
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        __DEV__: false,
        GLOBAL: false,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import/resolver': {
        'babel-module': {},

        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      'max-len': 'off',
      'prefer-promise-reject-errors': 'off',
      'react/no-did-update-set-state': 'off',
      'global-require': 'off',
      'import/prefer-default-export': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/unbound-method': 'off',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'parameter'],
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: ['function'],
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: ['variable'],
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
        },
        {
          selector: ['default'],
          modifiers: ['readonly'],
          format: ['UPPER_CASE'],
        },
      ],

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.tsx'],
        },
      ],

      'import/extensions': [
        'error',
        {
          js: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],

      'flowtype/space-after-type-colon': 'off',
      'flowtype/no-types-missing-file-annotation': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-console': ['warn'],

      'no-underscore-dangle': [
        'warn',
        {
          allowAfterThis: true,
        },
      ],

      'no-plusplus': 0,

      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },

          AssignmentExpression: {
            array: false,
            object: true,
          },
        },
      ],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],

      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always-and-inside-groups',
        },
      ],

      'react/forbid-prop-types': 0,

      'react/sort-comp': [
        1,
        {
          order: [
            'type-annotations',
            'static-methods',
            'lifecycle',
            'everything-else',
            'render',
          ],
        },
      ],

      'react/sort-prop-types': [
        'error',
        {
          callbacksLast: true,
          requiredFirst: false,
        },
      ],

      'react/require-default-props': 0,
      'no-void': 0,
    },
  },
]);
