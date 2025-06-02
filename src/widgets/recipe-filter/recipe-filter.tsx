import { useState, useEffect, useRef, useCallback } from 'react';
import { RecipeType } from '../../entities/data';
import './recipe-filter.css';

interface RecipeFilterProps {
  state: RecipeType[] | null;
  onFilter: (filteredRecipes: RecipeType[]) => void;
}

export default function RecipeFilter({ state, onFilter }: RecipeFilterProps) {
  const [filters, setFilters] = useState({
    difficulty: 'all',
    cookingTime: 'all',
    ingredientCount: 'all',
    category: 'all',
    eatingTime: 'all'
  });
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Мемоизация функции фильтрации
  const applyFilters = useCallback(() => {
    if (!state || !Array.isArray(state)) {
      onFilter([]);
      return;
    }

    const filtered = state.filter(recipe => {
      return (
        (filters.difficulty === 'all' || 
          (filters.difficulty === 'easy' && recipe.difficulty() === 'Легко') ||
          (filters.difficulty === 'medium' && recipe.difficulty() === 'Средне') ||
          (filters.difficulty === 'hard' && recipe.difficulty() === 'Сложно')) &&
        (filters.cookingTime === 'all' ||
          (filters.cookingTime === 'fast' && recipe.cookingTimeId === 1) ||
          (filters.cookingTime === 'long' && recipe.cookingTimeId === 2)) &&
        (filters.ingredientCount === 'all' ||
          (filters.ingredientCount === 'few' && recipe.ingredients.length <= 3) ||
          (filters.ingredientCount === 'medium' && recipe.ingredients.length > 3 && recipe.ingredients.length <= 5) ||
          (filters.ingredientCount === 'many' && recipe.ingredients.length > 5)) &&
        (filters.category === 'all' ||
          (filters.category === 'appetizer' && recipe.categoryId === 1) ||
          (filters.category === 'main' && recipe.categoryId === 2) ||
          (filters.category === 'dessert' && recipe.categoryId === 5) ||
          (filters.category === 'drink' && recipe.categoryId === 4)) &&
        (filters.eatingTime === 'all' ||
          (filters.eatingTime === 'breakfast' && recipe.eatingTimeId === 1) ||
          (filters.eatingTime === 'lunch' && recipe.eatingTimeId === 2) ||
          (filters.eatingTime === 'dinner' && recipe.eatingTimeId === 4) ||
          (filters.eatingTime === 'snack' && recipe.eatingTimeId === 3))
      );
    });

    onFilter(filtered);
  }, [state, filters, onFilter]);

  // Обработчик изменения фильтров
  const handleFilterChange = useCallback((filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  }, []);

  // Эффект для применения фильтров при их изменении
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Сброс фильтров
  const resetFilters = useCallback(() => {
    setFilters({
      difficulty: 'all',
      cookingTime: 'all',
      ingredientCount: 'all',
      category: 'all',
      eatingTime: 'all'
    });
  }, []);

  const toggleFilters = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="filter-container" ref={filterRef}>
      <button className="filter-button" onClick={toggleFilters}>
        Фильтры
        <svg 
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`filter-icon ${isOpen ? 'open' : ''}`}
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </button>

      {isOpen && (
        <div className="filter-dropdown" onClick={e => e.stopPropagation()}>
          {[
            { label: 'Сложность:', name: 'difficulty', options: [
              { value: 'all', label: 'Любая' },
              { value: 'easy', label: 'Легкая' },
              { value: 'medium', label: 'Средняя' },
              { value: 'hard', label: 'Сложная' }
            ]},
            { label: 'Время приготовления:', name: 'cookingTime', options: [
              { value: 'all', label: 'Любое' },
              { value: 'fast', label: 'Быстро (до 30 мин)' },
              { value: 'long', label: 'Долго (более 30 мин)' }
            ]},
            { label: 'Количество ингредиентов:', name: 'ingredientCount', options: [
              { value: 'all', label: 'Любое' },
              { value: 'few', label: 'До 3' },
              { value: 'medium', label: '4-5' },
              { value: 'many', label: 'Более 5' }
            ]},
            { label: 'Категория:', name: 'category', options: [
              { value: 'all', label: 'Любая' },
              { value: 'appetizer', label: 'Закуска' },
              { value: 'main', label: 'Основное блюдо' },
              { value: 'dessert', label: 'Десерт' },
              { value: 'drink', label: 'Напиток' }
            ]},
            { label: 'Время приема:', name: 'eatingTime', options: [
              { value: 'all', label: 'Любое' },
              { value: 'breakfast', label: 'Завтрак' },
              { value: 'lunch', label: 'Обед' },
              { value: 'snack', label: 'Полдник' },
              { value: 'dinner', label: 'Ужин' }
            ]}
          ].map((filterGroup) => (
            <div key={filterGroup.name} className="filter-group">
              <label>{filterGroup.label}</label>
              <select 
                value={filters[filterGroup.name as keyof typeof filters]}
                onChange={(e) => handleFilterChange(
                  filterGroup.name as keyof typeof filters, 
                  e.target.value
                )}
              >
                {filterGroup.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button className="reset-filters-button" onClick={resetFilters}>
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}