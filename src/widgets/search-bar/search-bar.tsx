import { RecipeType } from "../../entities/data";
import RecipeSearch from "../../features/ricipe-search";
import { useCallback } from "react";

interface SearchBarProps {
    recipes: RecipeType[];
    onSelectRecipe: (recipe: RecipeType | null) => void;
}

export default function SearchBar({ recipes, onSelectRecipe }: SearchBarProps) {
    const handleSelect = useCallback((recipe: RecipeType | null) => {
        onSelectRecipe(recipe);
    }, [onSelectRecipe]);
    
    return (
        <div className="recipe-search-container">         
            <RecipeSearch 
                recipes={recipes} 
                onSelectRecipe={handleSelect} 
            />
        </div>
    )
}