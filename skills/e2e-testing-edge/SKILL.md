---
name: e2e-testing-edge
description: Guide for writing and executing end-to-end (E2E) test cases with Playwright and Cypress using the Microsoft Edge browser, avoiding unapproved browser downloads on locked-down corporate environments.
---

# Microsoft Edge E2E Testing & Playwright Configuration

This skill guides you through configuring E2E testing frameworks (Playwright, Cypress, Puppeteer) to run strictly using the local **Microsoft Edge** browser, adhering to corporate environment security constraints.

---

## 🎭 Playwright Configuration (Recommended)

To run E2E test cases on Windows or macOS using your locally installed Microsoft Edge:

1. **Skip Browser Downloads** (to prevent corporate proxy/firewall blockages):
   Set this environment variable during installation:
   ```cmd
   set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
   ```
   Or in your `.env` or system variables.

2. **Configure `playwright.config.ts`**:
   Target the **`msedge`** channel to use the system-installed Edge browser:
   ```typescript
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './e2e',
     fullyParallel: true,
     reporter: 'html',
     use: {
       baseURL: 'http://localhost:3000',
       trace: 'on-first-retry',
     },
     projects: [
       {
         name: 'Microsoft Edge',
         use: {
           ...devices['Desktop Edge'],
           channel: 'msedge', // Enforces use of the local Edge installation
         },
       },
     ],
   });
   ```

3. **Writing E2E Test Cases (Page Object Model)**:
   ```typescript
   // e2e/specs/login.spec.ts
   import { test, expect } from '@playwright/test';

   test.describe('Authentication Flow', () => {
     test('should log in successfully with valid credentials', async ({ page }) => {
       await page.goto('/login');
       
       await page.getByLabel(/email/i).fill('developer@company.com');
       await page.getByLabel(/password/i).fill('SecurePass123!');
       await page.getByRole('button', { name: /sign in/i }).click();

       // Verify redirected dashboard elements
       await expect(page).toHaveURL('/dashboard');
       await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
     });
   });
   ```

4. **Running Playwright on Edge**:
   ```cmd
   npx playwright test --project="Microsoft Edge"
   ```

---

## 🌲 Cypress Configuration

To run Cypress E2E tests on Edge:

1. Cypress automatically detects local installations of Microsoft Edge.
2. Run E2E tests headless using the Edge browser:
   ```cmd
   npx cypress run --browser edge
   ```
3. Run Cypress interactively with the GUI opened in Edge:
   ```cmd
   npx cypress open --browser edge
   ```

---

## 🤖 Puppeteer / browser-native Configuration

If the Pi agent or local automation needs to launch browser-native instances via Puppeteer or custom scripts:

1. Explicitly pass the local Microsoft Edge executable path in the launch options:

   **Windows Path**:
   `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

   **macOS Path**:
   `/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge`

2. **Puppeteer Code Example**:
   ```typescript
   import puppeteer from 'puppeteer-core';

   const browser = await puppeteer.launch({
     executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
     headless: true
   });
   ```
