import { useState } from "react";
import RecipeCard from "../recipe-card/recipe-card";
import './RandomRecipe.css';
import { useRecipes } from "../../app/recipes-context";

export default function TakeRecipe() {
  const [recipeId, setRecipeId] = useState<number | undefined>(undefined)
  const { state } = useRecipes()

  const chooseRandomRecipe = (): void => {
    const availableRecipes = state.filter(recipe => recipe.id !== recipeId)
    if (availableRecipes.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * availableRecipes.length)
    const selectedId = availableRecipes[randomIndex].id
    setRecipeId(selectedId)
  }

  const selectedRecipe = state.find(recipe => recipe.id === recipeId)

  return (
    <div className="random-recipe-container">
      <h1>Случайный Рецепт</h1>
      <button onClick={chooseRandomRecipe} className="button-to-roll">
        Выбрать случайный рецепт
      </button>
      {selectedRecipe && <RecipeCard recipe={selectedRecipe} />}
    </div>
  )
}