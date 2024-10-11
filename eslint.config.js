const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const tseslint = require('typescript-eslint');
const stylisticJs = require('@stylistic/eslint-plugin-js');

module.exports = tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/js': stylisticJs,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@stylistic/js/wrap-regex': 'error',
      '@stylistic/js/arrow-spacing': 'error',
      '@stylistic/js/array-bracket-spacing': 'error',
      '@stylistic/js/comma-spacing': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/js/semi-spacing': 'error',
      '@stylistic/js/wrap-iife': ['error', 'inside'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/arrow-parens': ['error', 'always'],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      '@stylistic/js/indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 'first',
          body: 1,
        },
        FunctionExpression: {
          parameters: 'first',
          body: 1,
        },
        CallExpression: {
          arguments: 'first',
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: true,
        ignoreComments: false,
      }],
    },
  },
);
