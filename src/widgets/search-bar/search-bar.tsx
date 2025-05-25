import { RecipeType } from "../../entities/data";
import RecipeSearch from "../../features/ricipe-search";

interface SearchBarProps {
    recipes: RecipeType[];
    onSelectRecipe: (recipe: RecipeType | null) => void;
}

export default function SearchBar ({ recipes, onSelectRecipe }: SearchBarProps) {
    
    return (
        <div className="recipe-search-container">         
            <RecipeSearch 
                recipes={recipes} 
                onSelectRecipe={onSelectRecipe} 
            />
        </div>
    )
}