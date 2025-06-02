import { useMemo } from "react";
import RecipeCard from "../../widgets/recipe-card/recipe-card";
import { useRecipes } from "../../app/recipes-context";
import "./favorites-page.css"
import PageTitle from "../../shared/page-title";

export default function FavoritesPage() {
  const { state } = useRecipes();
  const favorites = useMemo(() => state.filter(recipe => recipe.favorite), [state]);

  return (
    <div className="favorites-page">
      <PageTitle title="Избранное"/>
      <h1>Мои избранные рецепты</h1>
      
      {favorites.length === 0 ? (
        <p>Вы пока не добавили рецепты в избранное</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}