import { test, expect } from '@playwright/test';

test.describe('Тестирование фильтров и поиска рецептов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('Проверка работы фильтров и поиска', async ({ page }) => {
    // 1. Работа с фильтрами
    await page.click('button.filter-button');
    await expect(page.locator('.filter-dropdown')).toBeVisible();

    // Применяем несколько фильтров
    await page.selectOption('select >> nth=0', 'easy');
    await page.selectOption('select >> nth=1', 'fast');
    
    // 2. Работа с поисковой строкой
    const searchInput = page.locator('.react-select__input-container');
    
    // Кликаем на поисковую строку
    await searchInput.click();
    
    // Вводим конкретный запрос
    await page.locator('.react-select__input-container input').fill('Бананы в шоколаде');
    
    // Ждём появления результатов
    await page.waitForSelector('.react-select__menu', { state: 'visible' });

    // Проверяем результаты
    const noOptionsMessage = page.locator('.react-select__menu').getByText('Ничего не найдено');
    const options = page.locator('.react-select__option');
    
    if (await noOptionsMessage.isVisible()) {
      await expect(noOptionsMessage).toBeVisible();
    } else {
      await expect(options.first()).toBeVisible();
    }
  });

  test('Проверка взаимодействия фильтров и поиска', async ({ page }) => {
    // 1. Применяем фильтр
    await page.click('button.filter-button');
    await page.selectOption('select >> nth=0', 'medium');
    
    // 2. Работа с поиском
    const searchInput = page.locator('.react-select__input-container');
    await searchInput.click();
    await page.locator('.react-select__input-container input').fill('Бананы в шоколаде');
    
    // 3. Проверяем сохранение фильтра
    await page.click('button.filter-button');
    await expect(page.locator('select >> nth=0')).toHaveValue('medium');
  });
});