import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import playwrightPlugin from 'eslint-plugin-playwright';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'], // Include TypeScript files
        languageOptions: {
            parser: tsParser, // Use the TypeScript parser
            parserOptions: {
                ecmaVersion: 2020, // Support modern ECMAScript features
                sourceType: 'module', // Enable ES modules
                project: './tsconfig.json', // Use your TypeScript configuration
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            playwright: playwrightPlugin,
        },
        rules: {
            // TypeScript-specific rules
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            // Playwright-specific rules
            'playwright/no-skipped-test': 'warn',
            'playwright/no-focused-test': 'error',

            // General JavaScript/TypeScript rules
            'no-console': 'warn',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
        },
    },
];