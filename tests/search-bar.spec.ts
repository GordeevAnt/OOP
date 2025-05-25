import { test, expect } from '@playwright/test';

test('Edit recipe basic fields', async ({ page }) => {
  await page.goto('/');

  // Кликнуть на контейнер, чтобы открыть список
    await page.locator('.react-select__control').click();
    await page.getByRole('option', { name: 'Салат Оливье (Закуска)' }).click()

    await page.locator('.react-select__control').click();
    await page.getByRole('option', { name: 'Омлет (Первое блюдо)' }).click()
});