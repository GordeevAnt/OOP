import { useState, useEffect, useRef } from 'react';
import { RecipeType } from '../../entities/data';
import './recipe-filter.css';

interface RecipeFilterProps {
  state: RecipeType[] | null;
  onFilter: (filteredRecipes: RecipeType[]) => void;
}

export default function RecipeFilter({ state, onFilter }: RecipeFilterProps) {
  const [difficulty, setDifficulty] = useState<string>('all');
  const [cookingTime, setCookingTime] = useState<string>('all');
  const [ingredientCount, setIngredientCount] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [eatingTime, setEatingTime] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyFilters();
  }, [difficulty, cookingTime, ingredientCount, category, eatingTime]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyFilters = () => {
    // Проверяем, что state существует и это массив
    if (!state || !Array.isArray(state)) {
      onFilter([]);
      return;
    }

    let filtered = [...state];

    if (difficulty !== 'all') {
      filtered = filtered.filter(recipe => 
        difficulty === 'easy' ? recipe.difficulty() === 'Легко' :
        difficulty === 'medium' ? recipe.difficulty() === 'Средне' :
        recipe.difficulty() === 'Сложно'
      );
    }

    if (cookingTime !== 'all') {
      filtered = filtered.filter(recipe => 
        cookingTime === 'fast' ? recipe.cookingTimeId === 1 :
        recipe.cookingTimeId === 2
      );
    }

    if (ingredientCount !== 'all') {
      filtered = filtered.filter(recipe => 
        ingredientCount === 'few' ? recipe.ingredients.length <= 3 :
        ingredientCount === 'medium' ? recipe.ingredients.length > 3 && recipe.ingredients.length <= 5 :
        recipe.ingredients.length > 5
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(recipe => 
        category === 'appetizer' ? recipe.categoryId === 1 :
        category === 'main' ? recipe.categoryId === 2 :
        category === 'dessert' ? recipe.categoryId === 5 :
        recipe.categoryId === 4
      );
    }

    if (eatingTime !== 'all') {
      filtered = filtered.filter(recipe => 
        eatingTime === 'breakfast' ? recipe.eatingTimeId === 1 :
        eatingTime === 'lunch' ? recipe.eatingTimeId === 2 :
        eatingTime === 'dinner' ? recipe.eatingTimeId === 4 :
        recipe.eatingTimeId === 3
      );
    }

    onFilter(filtered);
  };

  const resetFilters = () => {
    setDifficulty('all');
    setCookingTime('all');
    setIngredientCount('all');
    setCategory('all');
    setEatingTime('all');
  };

  const toggleFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

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
          <div className="filter-group">
            <label>Сложность:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="all">Любая</option>
              <option value="easy">Легкая</option>
              <option value="medium">Средняя</option>
              <option value="hard">Сложная</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Время приготовления:</label>
            <select value={cookingTime} onChange={(e) => setCookingTime(e.target.value)}>
              <option value="all">Любое</option>
              <option value="fast">Быстро (до 30 мин)</option>
              <option value="long">Долго (более 30 мин)</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Количество ингредиентов:</label>
            <select value={ingredientCount} onChange={(e) => setIngredientCount(e.target.value)}>
              <option value="all">Любое</option>
              <option value="few">До 3</option>
              <option value="medium">4-5</option>
              <option value="many">Более 5</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Категория:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Любая</option>
              <option value="appetizer">Закуска</option>
              <option value="main">Основное блюдо</option>
              <option value="dessert">Десерт</option>
              <option value="drink">Напиток</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Время приема:</label>
            <select value={eatingTime} onChange={(e) => setEatingTime(e.target.value)}>
              <option value="all">Любое</option>
              <option value="breakfast">Завтрак</option>
              <option value="lunch">Обед</option>
              <option value="snack">Полдник</option>
              <option value="dinner">Ужин</option>
            </select>
          </div>

          <button 
            className="reset-filters-button"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}