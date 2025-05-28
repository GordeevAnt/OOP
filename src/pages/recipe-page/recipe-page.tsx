import { useParams } from "react-router-dom";
import "./RecipePage.css"
import ExpandableText from "../../shared/text-block";
import RecipeActions from "../../widgets/recipe-actions/recipe-actions";
import IngredientsAndPortions from "../../widgets/ingredients-and-portions/ingredients-and-portions";
import PageTitle from "../../shared/page-title";
import SameRecipesList from "../../widgets/same-recipes-list/same-recipes-list";
import { useRecipes } from "../../app/recipes-context";
import NotFoundPage from "../NotFoundPage";

export default function RecipePage() {
    const { id } = useParams();
    const { state } = useRecipes();
    const recipe = state.find(r => r.id === Number(id));

    if (!recipe) {
        return (
            <div className='container'>
                    <div className="mainInfo">
                        <NotFoundPage />
                    </div>
            </div>
        )
    }

    return(
        <div className="container">
            <PageTitle title={recipe.name} />
            <div className="mainInfo">
                <RecipeActions recipe={recipe} />
                <h1>{recipe.name}</h1>
                <img src={recipe.img} alt={recipe.name}/>
                <h4>Категория: {recipe.category()}</h4>
                <h4>Время приема пищи: {recipe.eatingTime()}</h4>
                <h4>Сложность приготовления: {recipe.difficulty()}</h4>
                <h4>Время приготовления: {recipe.cookingTime()}</h4>
                <IngredientsAndPortions recipe={recipe} />
            </div>
            <div className="todoList">
                <h3>Как готовить</h3>
                <ExpandableText text={recipe.todoList} maxLength={100}/>
            </div>
            <div className="same-recipes">
                <h3>Похожие рецепты</h3>
                <SameRecipesList recipe={recipe} />
            </div>
        </div>
    )
}