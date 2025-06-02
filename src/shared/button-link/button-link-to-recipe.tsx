import { useNavigate } from "react-router-dom";
import { RecipeType } from "../../entities/data";
import './ButtonLinkToRecipe.css'


export default function ButtonLink ({text, recipe} : {text: string, recipe: RecipeType}) {
    const navigate = useNavigate();

    const categoryUrl = [
        {id: 1, name: 'snacks'},
        {id: 2, name: 'first-courses'},
        {id: 3, name: 'second-courses'},
        {id: 4, name: 'drinks'},
        {id: 5, name: 'desserts'},
        {id: 6, name: 'other'},
    ]

    const handleClick = () => {
        navigate(`/${categoryUrl[recipe.categoryId - 1].name}/recipe/${recipe.id}`); // Добавляем categoryId в URL
    }
    return(
        <>
            <button onClick={handleClick} className="button-link">
                {text}
            </button>
        </>
    )
}