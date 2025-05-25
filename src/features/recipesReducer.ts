import { RecipeType } from '../entities/data';

// Типы для действий (actions)
export type RecipesAction =
  | { type: "SET_RECIPES"; payload: RecipeType[] }
  | { type: "ADD_RECIPE"; payload: RecipeType }
  | { type: "UPDATE_RECIPE"; payload: RecipeType }
  | { type: "DELETE_RECIPE"; payload: number };

// Функция-редьюсер
export function recipesReducer(state: RecipeType[], action: RecipesAction): RecipeType[] {
  switch (action.type) {
    case "SET_RECIPES":
      return action.payload;
      
    case "ADD_RECIPE":
      return [...state, action.payload];
      
    case "UPDATE_RECIPE":
      return state.map(recipe => 
        recipe.id === action.payload.id ? action.payload : recipe
      );
      
    case "DELETE_RECIPE":
      return state.filter(recipe => recipe.id !== action.payload);
      
    default:
      return state;
  }
}