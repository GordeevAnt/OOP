import { createContext, useCallback, useContext, useReducer } from "react";
import { RecipeType, recipes as initialRecipes } from "../entities/data";
import { RecipesAction, recipesReducer } from "../features/recipesReducer";

type RecipesContextType = {
  state: RecipeType[];
  dispatch: React.Dispatch<RecipesAction>;
  addRecipe: (recipe: RecipeType) => void;
  updateRecipe: (recipe: RecipeType) => void;
  deleteRecipe: (id: number) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(recipesReducer, initialRecipes);

  const addRecipe = useCallback((recipe: RecipeType) => {
    dispatch({ type: "ADD_RECIPE", payload: recipe });
  }, []);

  const updateRecipe = useCallback((recipe: RecipeType) => {
    dispatch({ type: "UPDATE_RECIPE", payload: recipe });
  }, []);

  const deleteRecipe = useCallback((id: number) => {
    dispatch({ type: "DELETE_RECIPE", payload: id });
  }, []);

  return (
    <RecipesContext.Provider value={{ 
      state, 
      dispatch,
      addRecipe, 
      updateRecipe,
      deleteRecipe
    }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
}