import { useEffect, useState } from "react";
import { RecipeType } from "../../entities/data"; // Импортируем recipes
import RecipeCard from "../../widgets/recipe-card/recipe-card";
import { useRecipes } from "../../app/recipes-context";
import "./favorites-page.css"
import PageTitle from "../../shared/page-title";

export default function FavoritesPage() {
  const { state } = useRecipes();
  const [favorites, setFavorites] = useState<RecipeType[]>([]);

  useEffect(() => {
    const favoriteRecipes = state.filter(recipe => recipe.favorite);
    setFavorites(favoriteRecipes);
  }, [state]);

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