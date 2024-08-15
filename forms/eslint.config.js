import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'vite-env.d.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules, // Подключаем базовые правила JS
      ...tseslint.configs.recommended.rules, // Подключаем базовые правила TypeScript
      ...reactHooks.configs.recommended.rules, // Подключаем правила для React Hooks
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-explicit-any': 'error', // Запрещаем использование `any`
      'prettier/prettier': 'error', // Подключаем Prettier для проверки форматирования
    },
  },
];
