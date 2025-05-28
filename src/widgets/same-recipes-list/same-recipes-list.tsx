import { useRecipes } from "../../app/recipes-context";
import { RecipeType } from "../../entities/data";
import RecipeCard from "../recipe-card/recipe-card";
import './SameRecipesList.css'

export default function SameRecipesList({ recipe }: { recipe: RecipeType }) {
  const { state } = useRecipes()

  const getSimilarityScore = (current: RecipeType, other: RecipeType) => {
    if (current.id === other.id) return -1
    
    const currentIngredients = current.ingredients.map(ing => ing.id)
    const otherIngredients = other.ingredients.map(ing => ing.id)
    
    const commonIngredients = currentIngredients.filter(id => 
      otherIngredients.includes(id)
    )
    
    return commonIngredients.length
  }

  const findSimilarRecipes = () => {
    const recipesWithScores = state.map(otherRecipe => ({
      recipe: otherRecipe,
      score: getSimilarityScore(recipe, otherRecipe)
    }))
    
    return recipesWithScores
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.recipe)
  }

  const similarRecipes = findSimilarRecipes()

  if (similarRecipes.length === 0) {
    return <div className='noRecipes'>Нет похожих рецептов</div>
  }

  return (
    <ul className='sameRecipesList'>
      {similarRecipes.map(similarRecipe => (
        <li key={similarRecipe.id} className='sameRecipeItem'>
          <RecipeCard recipe={similarRecipe} />
        </li>
      ))}
    </ul>
  )
}