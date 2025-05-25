import { test, expect } from '@playwright/test';

test('Create full recipe', async ({ page }) => {
  // 1. Переходим на страницу создания
  await page.goto('/newRecipe');
  await page.waitForSelector('form');

  // 2. Заполняем название
  await page.locator('div')
    .filter({ hasText: /^Название рецепта$/ })
    .getByRole('textbox')
    .fill('Гречневая каша с грибами');

  // 3. Выбираем категорию
  await page.getByRole('button', { name: 'Первое блюдо' }).click();

  // 4. Выбираем время приема пищи
  await page.getByRole('button', { name: 'Обед' }).click();

  // 5. Выбираем сложность приготовления
  await page.getByRole('button', { name: 'Легко' }).click();

  // 6. Выбираем время приготовления
  await page.getByRole('button', { name: 'Долго (более 30 минут)' }).click();

  // 7. Добавляем только 1 ингредиент
  await addIngredientWithQuantity(page, 'Морковь', '200', 'гр');

  // 8. Заполняем инструкции
  await page.getByRole('textbox', { name: 'Опишите шаги приготовления' })
    .fill([
      '1. Обжарить грибы с луком',
      '2. Добавить гречку и воду',
      '3. Тушить 20 минут'
    ].join('\n'));

  // 9. Мокаем успешный ответ API
  await page.route('**/api/recipes', route => route.fulfill({
    status: 201,
    body: JSON.stringify({ id: 789, success: true })
  }));

  // 10. Ожидаем и обрабатываем alert
  let dialogMessage = '';
  page.on('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  // 11. Сохраняем рецепт
  await page.getByRole('button', { name: 'Сохранить рецепт' }).click();

  // 12. Ждем 1 секунду для обработки alert
  await page.waitForTimeout(1000);

  // 13. Проверяем что alert был вызван
  expect(dialogMessage).toContain('успешно');
});

async function addIngredientWithQuantity(page, name: string, amount: string, unit: string) {
  // 1. Открываем выбор ингредиента
  await page.locator('div.ingredients-select').click();
  
  // 2. Выбираем ингредиент из списка
  await page.getByRole('option', { name }).click();

  // 3. Нажимаем плюсик добавления ингредиента
  await page.getByRole('button', { name: '+' }).first().click();

  // 4. Заполняем количество
  await page.getByRole('listitem')
    .filter({ hasText: `${name}-+мллгркг×` })
    .getByRole('textbox')
    .fill(amount);

  // 5. Выбираем единицы измерения
  await page.getByRole('listitem')
    .filter({ hasText: name })
    .getByRole('combobox')
    .selectOption(unit);
}