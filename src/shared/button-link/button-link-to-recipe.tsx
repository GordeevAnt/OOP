import { useNavigate, useParams } from "react-router-dom";
import { RecipeType } from "../../entities/data";
import './ButtonLinkToRecipe.css'


export default function ButtonLink ({text, recipe} : {text: string, recipe: RecipeType}) {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const handleClick = () => {
        navigate(`/${categoryId}/recipe/${recipe.id}`); // Добавляем categoryId в URL
    }
    return(
        <>
            <button onClick={handleClick} className="button-link">
                {text}
            </button>
        </>
    )
}