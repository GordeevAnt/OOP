import { test, expect } from '@playwright/test';

test('Редактирование и сохранение рецепта торта', async ({ page }) => {
  test.setTimeout(60000);

  // 1. Переходим на страницу редактирования
  await page.goto('/edit-recipe/1', { waitUntil: 'networkidle' });
  
  // 2. Ждем загрузки формы
  await expect(page.locator('.input-name-field')).toBeVisible({ timeout: 15000 });

  // 3. Изменяем название рецепта
  await page.locator('.input-name-field').fill('Торт "Наполеон"');
  await expect(page.locator('.input-name-field')).toHaveValue('Торт "Наполеон"');

  // 4. Изменяем категорию
  await page.getByRole('button', { name: 'Десерт' }).click();
  await page.getByRole('button', { name: 'Первое блюдо' }).click();
  await expect(page.getByRole('button', { name: 'Первое блюдо' })).toBeVisible();

  // 5. Изменяем время приема пищи
  await page.getByRole('button', { name: 'Любое время' }).click();
  await page.getByRole('button', { name: 'Завтрак' }).click();
  await expect(page.getByRole('button', { name: 'Завтрак' })).toBeVisible();

  // 6. Изменяем время приготовления
  await page.getByRole('button', { name: 'Долго (более 30 минут)' }).click();
  await page.getByRole('button', { name: 'Быстро (до 30 минут)' }).click();
  await expect(page.getByRole('button', { name: 'Быстро (до 30 минут)' })).toBeVisible();

  // 7. Изменяем сложность приготовления
  await page.getByRole('button', { name: 'Средне' }).click();
  await page.getByRole('button', { name: 'Сложно' }).click();
  await expect(page.getByRole('button', { name: 'Сложно' })).toBeVisible();

  // 8. Добавляем новый ингредиент
  // Выбираем ингредиент из dropdown
  const ingredientSelect = page.locator('.ingredients-select');
  await ingredientSelect.click();
  
  // Выбираем соль
  await page.getByText('Соль поваренная').click();
  
  // Нажимаем кнопку добавления
  const addButton = page.locator('.ingredients-add-button');
  await addButton.click();

  // Ждем появления нового ингредиента в списке
  const newIngredientItem = page.locator('.ingredients-item').filter({ hasText: 'Соль поваренная' });
  await expect(newIngredientItem).toBeVisible({ timeout: 10000 });

  // Вводим количество
  const saltInput = newIngredientItem.locator('.ingredients-count-input');
  await saltInput.fill('10');
  expect(await saltInput.inputValue()).toBe('10');

  // Выбираем единицы измерения (граммы)
  await newIngredientItem.locator('.ingredients-unit-select').selectOption('гр');

  // 9. Сохраняем изменения
  await page.locator('.save-button').click();
  
  // 10. Проверяем переход
  await expect(page).toHaveURL(/\/recipe\/1/, { timeout: 10000 });
});