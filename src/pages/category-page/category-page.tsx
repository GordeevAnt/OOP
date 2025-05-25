import { useState, useEffect, useCallback } from 'react';
import PageTitle from "../../shared/page-title";
import RecipeCard from "../../widgets/recipe-card/recipe-card";
import './CategoryPage.css';
import { useRecipes } from "../../app/recipes-context";
import { RecipeType } from "../../entities/data";

interface RecipePageProps {
  categoryID?: number;
}

const RECIPES_PER_PAGE = 8;
const SCROLL_THRESHOLD = 300;

export default function CategoryPage({ categoryID }: RecipePageProps) {
  const { state } = useRecipes();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const { title, filteredRecipes } = getCategoryData(categoryID, state);
  const visibleRecipes = filteredRecipes.slice(0, page * RECIPES_PER_PAGE);
  const hasMore = visibleRecipes.length < filteredRecipes.length;

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const distanceToBottom = documentHeight - (scrollTop + windowHeight);

    if (distanceToBottom < SCROLL_THRESHOLD) {
      setIsLoading(true);
      setPage(prev => prev + 1);
      setIsLoading(false);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, filteredRecipes]);

  useEffect(() => {
    // Сбрасываем страницу на первую при смене категории
    setPage(1);
    
    // Прокручиваем страницу вверх
    window.scrollTo({
      top: 0,
    });
  }, [categoryID]); // Зависимость от categoryID

  useEffect(() => {
    // Проверяем, нужно ли подгрузить сразу, если контента мало
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    
    if (documentHeight <= windowHeight && hasMore) {
      handleScroll();
    }
  }, [visibleRecipes, hasMore, handleScroll]);

  if (filteredRecipes.length === 0) {
    return (
      <div>
        <PageTitle title={title} />
        <p className="no-recipes">Рецепты не найдены</p>
      </div>
    );
  }

  return (
    <div className="category-container">
      <PageTitle title={title} />
      <ul className='recipe-catalog'>
        {visibleRecipes.map((recipe) => (
          <li key={recipe.id} className='recipe-catalog-item'>
            <RecipeCard recipe={recipe}/>
          </li>
        ))}
      </ul>
      {isLoading && <div className="loading-indicator">Загрузка...</div>}
      {!hasMore && filteredRecipes.length > RECIPES_PER_PAGE && (
        <div className="end-of-list">Все рецепты загружены</div>
      )}
    </div>
  );
}

function getCategoryData(categoryID?: number, recipes: RecipeType[] = []) {
  let title = "Главная";
  let filteredRecipes = [...recipes];

  if (categoryID !== undefined) {
    if (categoryID >= 1 && categoryID <= 5) {
      filteredRecipes = recipes.filter(recipe => recipe.categoryId === categoryID);
    }

    switch (categoryID) {
      case 1: title = "Закуски"; break;
      case 2: title = "Первые блюда"; break;
      case 3: title = "Вторые блюда"; break;
      case 4: title = "Напитки"; break;
      case 5: title = "Десерты"; break;
      default: title = "Главная";
    }
  }

  return { title, filteredRecipes };
}