import { useState, useEffect } from 'react';
import { RecipeType } from '../entities/data';

export function useRecipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  // Загрузка рецептов из localStorage при монтировании
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      // Инициализация стандартными рецептами, если в localStorage пусто
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }, []);

  // Сохранение рецептов в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe: RecipeType) => {
    setRecipes(prev => [...prev, newRecipe]);
  };

  const updateRecipe = (updatedRecipe: RecipeType) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const deleteRecipe = (id: number) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  return { recipes, addRecipe, updateRecipe, deleteRecipe };
}