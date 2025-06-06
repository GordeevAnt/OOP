import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeType } from "../entities/data";
import { HomeIcon } from "../widgets/home-icon/home-icon";
import RecipeFilter from "../widgets/recipe-filter/recipe-filter";
import SearchBar from "../widgets/search-bar/search-bar";
import SidePanel from "../widgets/sidebar/side-panel";
import { useRecipes } from "./recipes-context";

export function Header() {
  const { state } = useRecipes();
  const navigate = useNavigate();
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>(state || []);

  const navigateToRecipe = useCallback((recipe: RecipeType | null) => {
    recipe && navigate(`/${recipe.category() || 'all'}/recipe/${recipe.id}`);
  }, [navigate]);

  const handleFilter = useCallback((filtered: RecipeType[]) => {
    setFilteredRecipes(filtered);
  }, []);

  return (
    <header>
      <nav className='navbar'>
        <ul className='nav-list'>
          <li><SidePanel /></li>
          <li><HomeIcon /></li>
          <li>
            <SearchBar 
              recipes={filteredRecipes}
              onSelectRecipe={navigateToRecipe} 
            />
          </li>
          <li>
            <RecipeFilter 
              state={state} 
              onFilter={handleFilter} 
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}