// recipe-filter.tsx
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { RecipeType } from '../../entities/data';
import './recipe-filter.css';

interface RecipeFilterProps {
  state: RecipeType[] | null;
  onFilter: (filteredRecipes: RecipeType[]) => void;
}

export default function RecipeFilter({ state, onFilter }: RecipeFilterProps) {
  const [filterParams, setFilterParams] = useState({
    difficulty: 'all',
    cookingTime: 'all',
    ingredientCount: 'all',
    category: 'all',
    eatingTime: 'all'
  });
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Мемоизированная фильтрация рецептов
  const filteredRecipes = useMemo(() => {
    if (!state || !Array.isArray(state)) return [];

    return state.filter(recipe => {
      return (
        (filterParams.difficulty === 'all' || 
          (filterParams.difficulty === 'easy' && recipe.difficulty() === 'Легко') ||
          (filterParams.difficulty === 'medium' && recipe.difficulty() === 'Средне') ||
          (filterParams.difficulty === 'hard' && recipe.difficulty() === 'Сложно')) &&
        (filterParams.cookingTime === 'all' ||
          (filterParams.cookingTime === 'fast' && recipe.cookingTimeId === 1) ||
          (filterParams.cookingTime === 'long' && recipe.cookingTimeId === 2)) &&
        (filterParams.ingredientCount === 'all' ||
          (filterParams.ingredientCount === 'few' && recipe.ingredients.length <= 3) ||
          (filterParams.ingredientCount === 'medium' && recipe.ingredients.length > 3 && recipe.ingredients.length <= 5) ||
          (filterParams.ingredientCount === 'many' && recipe.ingredients.length > 5)) &&
        (filterParams.category === 'all' ||
          (filterParams.category === 'appetizer' && recipe.categoryId === 1) ||
          (filterParams.category === 'main' && recipe.categoryId === 2) ||
          (filterParams.category === 'dessert' && recipe.categoryId === 5) ||
          (filterParams.category === 'drink' && recipe.categoryId === 4)) &&
        (filterParams.eatingTime === 'all' ||
          (filterParams.eatingTime === 'breakfast' && recipe.eatingTimeId === 1) ||
          (filterParams.eatingTime === 'lunch' && recipe.eatingTimeId === 2) ||
          (filterParams.eatingTime === 'dinner' && recipe.eatingTimeId === 4) ||
          (filterParams.eatingTime === 'snack' && recipe.eatingTimeId === 3))
      );
    });
  }, [state, filterParams]);

  // При изменении фильтрованных рецептов вызываем onFilter
  useEffect(() => {
    onFilter(filteredRecipes);
  }, [filteredRecipes, onFilter]);

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

  const handleFilterChange = useCallback((filterName: keyof typeof filterParams, value: string) => {
    setFilterParams(prev => ({ ...prev, [filterName]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterParams({
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
                value={filterParams[filterGroup.name as keyof typeof filterParams]}
                onChange={(e) => handleFilterChange(
                  filterGroup.name as keyof typeof filterParams, 
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