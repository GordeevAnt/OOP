import PageTitle from "../shared/page-title";
import TakeRecipe from "../widgets/random-recipe/choose-random-recipe";

export default function GetRandomRecipe () {
    return(
        <div>
            <PageTitle title="Случайный рецепт"/>
            <TakeRecipe />
        </div>
    )
}