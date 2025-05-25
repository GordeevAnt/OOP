import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Указываем нашу папку с тестами
  timeout: 60000, // Таймаут для каждого теста
  expect: { timeout: 10000 }, // Таймаут для expect-assertions
  fullyParallel: true, // Параллельные тесты
  retries: process.env.CI ? 2 : 0, // Ретрии на CI
  workers: process.env.CI ? 1 : undefined, // Количество воркеров
  reporter: [
    ['html', { open: 'never' }], // HTML отчет
    ['list'] // Консольный вывод
  ],
  use: {
    baseURL: 'http://localhost:5173', // Должен совпадать с портом Vite
    actionTimeout: 10000, // Таймаут для действий
    trace: 'on', // Всегда включаем трассировку
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    timeout: 120000,
    reuseExistingServer: true,
  }
});