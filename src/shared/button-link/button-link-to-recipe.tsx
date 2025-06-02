import { useNavigate } from "react-router-dom";
import { RecipeType } from "../../entities/data";
import './ButtonLinkToRecipe.css'


export default function ButtonLink ({text, recipe} : {text: string, recipe: RecipeType}) {
    const navigate = useNavigate();

    const categoryUrl = [
        {id: 1, name: 'Закуска'},
        {id: 2, name: 'Первое блюдо'},
        {id: 3, name: 'Второе блюдо'},
        {id: 4, name: 'Напиток'},
        {id: 5, name: 'Десерт'},
        {id: 6, name: 'Другое'},
    ]

    const handleClick = () => {
        navigate(`/${categoryUrl[recipe.categoryId - 1].name}/recipe/${recipe.id}`); // Добавляем category в URL
    }
    return(
        <>
            <button onClick={handleClick} className="button-link">
                {text}
            </button>
        </>
    )
}