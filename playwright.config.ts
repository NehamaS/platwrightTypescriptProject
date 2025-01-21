import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests', 
    testMatch: '*.spec.ts', 
    timeout: 30000,   
    use: {
        baseURL: 'https://alpha-app.meliopayments.com/login'
    },
});