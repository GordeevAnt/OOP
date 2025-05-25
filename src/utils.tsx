import { useState } from "react";
import { recipes } from "./data"
import { Recipe } from "./App"

export const TakeRecipe = () => {
  // Состояние для хранения выбранного ID рецепта
  const [recipeId, setRecipeId] = useState<number | undefined>(undefined)

  // Функция для выбора случайного рецепта
  const choseRandomRecipe = (): number => {
    const availableRecipes = recipes.filter(recipe => recipe.id !== recipeId)
    const randomIndex = Math.floor(Math.random() * availableRecipes.length)
    const selectedId = availableRecipes[randomIndex].id
    setRecipeId(selectedId)
    return selectedId
  }

  // Обработчик клика по кнопке
  const handleClick = () => {
    choseRandomRecipe()
  }

  return (
    <>
      <button onClick={handleClick}>
        Выбрать случайный рецепт
      </button>
      <Recipe id={recipeId} />
    </>
  )
}