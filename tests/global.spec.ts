import { test, expect } from '@playwright/test';

async function addIngredientWithQuantity(page, name: string, amount: string, unit: string) {
  await page.locator('div.ingredients-select').click();
  await page.getByRole('option', { name }).click();
  await page.getByRole('button', { name: '+' }).first().click();
  await page.getByRole('listitem')
    .filter({ hasText: `${name}-+мллгркг×` })
    .getByRole('textbox')
    .fill(amount);
  await page.getByRole('listitem')
    .filter({ hasText: name })
    .getByRole('combobox')
    .selectOption(unit);
}

test('Edit recipe basic fields', async ({ page }) => {
  // Установим общий таймаут для теста
  test.setTimeout(120000);

  await page.goto('/');
  await expect(page).toHaveTitle(/Главная/);

  // Просмотр разделов каталога - используем Promise.all для параллельного выполнения
  await Promise.all([
    page.getByRole('listitem').filter({ hasText: 'Закуски' }).click(),
    page.waitForTimeout(500)
  ]);
  
  // Остальные разделы аналогично
  await page.getByRole('listitem').filter({ hasText: 'Первые блюда' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Вторые блюда' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Напитки' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Десерты' }).click();

  // Тест страницы рецепта (торт)
  await page.locator('div').filter({ hasText: 'ТортКатегория: Десерт' }).nth(3).hover();
  await Promise.all([
    page.getByRole('button', { name: 'Перейти на страницу рецепта' }).click(),
    page.waitForURL(/\/recipe\//) // Ждем перехода на страницу рецепта
  ]);

  // Пролистывание - уменьшаем количество итераций
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.getByText('Читать далее').click();
  await page.getByText('Свернуть').click();

  // Тест калькулятора - убираем лишние ожидания
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: '+' }).click();
  }
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: '-' }).click();
  }
  await page.getByRole('spinbutton').fill('0000');
  await page.getByRole('button', { name: '-' }).click();
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: '+' }).click();
  }

  // Переход на страницу блинов
  await page.locator('div').filter({ hasText: 'БлиныКатегория: Закуска' }).nth(3).hover();
  await Promise.all([
    page.getByRole('button', { name: 'Перейти на страницу рецепта' }).click(),
    page.waitForURL(/\/recipe\//)
  ]);

  // Сайд-бар и случайный рецепт
  await page.getByRole('button', { name: '☰' }).click();
  await page.getByRole('listitem').filter({ hasText: /^Случайный рецепт$/ }).click();
  
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: 'Выбрать случайный рецепт' }).click();
  }

  // Добавление рецепта
  await page.getByRole('button', { name: '☰' }).click();
  await page.getByRole('listitem').filter({ hasText: /^Добавить рецепт$/ }).click();

  // Заполнение формы
  await page.locator('div')
    .filter({ hasText: /^Название рецепта$/ })
    .getByRole('textbox')
    .fill('Гречневая каша с грибами');
  
  await page.getByRole('button', { name: 'Первое блюдо' }).click();
  await page.getByRole('button', { name: 'Обед' }).click();
  await page.getByRole('button', { name: 'Легко' }).click();
  await page.getByRole('button', { name: 'Долго (более 30 минут)' }).click();
  
  await addIngredientWithQuantity(page, 'Морковь', '200', 'гр');
  
  await page.getByRole('textbox', { name: 'Опишите шаги приготовления' })
    .fill([
      '1. Обжарить грибы с луком',
      '2. Добавить гречку и воду',
      '3. Тушить 20 минут'
    ].join('\n'));

  // Мокаем API
  await page.route('**/api/recipes', route => route.fulfill({
    status: 201,
    body: JSON.stringify({ id: 789, success: true })
  }));

  let dialogMessage = '';
  page.on('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Сохранить рецепт' }).click();
  await expect.poll(() => dialogMessage).toContain('успешно');

  // Переход на главную и поиск
  await page.getByRole('link', { name: 'Главная страница' }).click();
  await page.locator('.react-select__input-container').click();
  await page.locator('.react-select__input-container input').fill('Гре');
  
  const option = page.locator('.react-select__option', { hasText: 'Гречневая каша с грибами' });
  await option.click();
  await expect(page).toHaveTitle(/Гречневая каша с грибами/);
});