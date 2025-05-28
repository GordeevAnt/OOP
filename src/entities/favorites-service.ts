import { RecipeType } from "../entities/data";

const FAVORITES_KEY = "user_favorites";

export function getFavorites(): RecipeType[] {
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
}

export function addToFavorites(recipe: RecipeType): void {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === recipe.id)) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFromFavorites(recipeId: number): void {
  const favorites = getFavorites().filter(fav => fav.id !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(recipeId: number): boolean {
  return getFavorites().some(fav => fav.id === recipeId);
}