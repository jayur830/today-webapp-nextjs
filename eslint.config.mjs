import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import tsESlint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  /** typescript-eslint */
  ...tsESlint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  /** stylistic */
  {
    ...stylistic.configs['recommended'],
    rules: {
      ...stylistic.configs['recommended'].rules,
      '@stylistic/array-bracket-newline': [
        'error',
        { multiline: true },
      ],
      '@stylistic/array-element-newline': [
        'error',
        {
          consistent: true,
          multiline: true,
          minItems: 2,
        },
      ],
      '@stylistic/arrow-parens': 'error',
      '@stylistic/brace-style': 'error',
      '@stylistic/curly-newline': [
        'error',
        { minElements: 1 },
      ],
      '@stylistic/function-call-spacing': [
        'error',
        'never',
      ],
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          tabWidth: 2,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      '@stylistic/member-delimiter-style': 'error',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/object-property-newline': 'error',
      '@stylistic/padded-blocks': [
        'error',
        { blocks: 'never' },
      ],
      '@stylistic/quote-props': [
        'error',
        'as-needed',
      ],
      '@stylistic/semi': 'error',
      // '@stylistic/object-curly-newline': [
      //   'error',
      //   {
      //     ObjectExpression: {
      //       consistent: true,
      //       multiline: true,
      //       minProperties: 3,
      //     },
      //     //     ObjectPattern: {
      //     //       multiline: true,
      //     //       minProperties: 3,
      //     //     },
      //     //     ImportDeclaration: {
      //     //       multiline: true,
      //     //       minProperties: 3,
      //     //     },
      //     //     ExportDeclaration: {
      //     //       multiline: true,
      //     //       minProperties: 3,
      //     //     },
      //   },
      // ],
      // '@stylistic/jsx-wrap-multilines': ['error', { prop: 'parens-new-line' }],
      // '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
      // '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
    },
  },
  /** simple-import-sort */
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  /** unused-imports */
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default eslintConfig;
