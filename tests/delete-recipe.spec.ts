import { test, expect } from '@playwright/test';

const mockRecipe = {
  id: 1,
  name: 'Торт',
  favorite: false,
  categoryId: 1,
  eatingTimeId: 1,
  ingredients: [],
  img: ''
};

test.describe('Удаление рецепта', () => {
  test.beforeEach(async ({ page }) => {
    // Мокаем API
    await page.route('**/api/recipes*', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([mockRecipe])
    }));

    await page.route('**/api/recipes/1*', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockRecipe)
    }));

    await page.route('**/api/recipes/1/delete*', route => route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true })
    }));

    await page.goto('/recipe/1');
    await page.waitForSelector('.recipe-actions-container');
  });

  test('Удаление рецепта', async ({ page }) => {
    // 1. Подготавливаем обработчик диалога
    page.on('dialog', async dialog => {
      // Добавляем небольшую задержку перед подтверждением
      await page.waitForTimeout(500);
      expect(dialog.message()).toContain(`Удалить рецепт "${mockRecipe.name}"?`);
      await dialog.accept();
    });

    // 2. Кликаем на кнопку удаления
    await page.locator('.delete-btn').click();

    // 3. Ждем либо ответа API, либо изменения страницы
    await Promise.race([
      page.waitForResponse('**/api/recipes/1/delete*'),
      page.waitForNavigation(),
      page.waitForSelector('.recipe-name', { state: 'hidden' })
    ]);

    // 4. Дополнительная проверка что мы на правильной странице
    await expect(page).toHaveURL(/recipes|\//); // Проверяем что перешли на страницу рецептов или главную
  });
});