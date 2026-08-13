import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  // Trace、screenshot、video 等測試產物的輸出資料夾
  outputDir: 'test-results',

  // HTML 報告輸出到 playwright-report/
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',

    // 每次失敗都保留 trace
    trace: 'retain-on-failure',

    // 只有失敗時保存 screenshot
    screenshot: 'only-on-failure',

    // 只有失敗時保留 video
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // 後續需要跨瀏覽器時再取消註解
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});