import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['build/**', 'node_modules/**', 'src/config/index.ts']
  },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/']
        },
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin
    },
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false
        }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            }
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'object-curly-newline': 'off',
      'arrow-body-style': 'off',
      'react/jsx-props-no-spreading': 'off',
      'implicit-arrow-linebreak': 'off',
      'func-names': 'off',
      'operator-linebreak': 'off',
      'function-paren-newline': 'off',
      'react/require-default-props': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-curly-newline': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/destructuring-assignment': 'off',
      'no-shadow': 'off',
      'react/no-array-index-key': 'off'
    }
  },
  prettierRecommended
);
