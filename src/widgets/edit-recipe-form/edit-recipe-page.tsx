import { useParams, useNavigate } from "react-router-dom";
import { RecipeType } from "../../entities/data";
import EditRecipeForm from "../../widgets/edit-recipe-form/edit-recipe-form";
import { useRecipes } from "../../app/recipes-context";

export default function EditRecipePage() {
  const { state } = useRecipes()
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = id ? parseInt(id) : -1;
  const recipe = state.find(r => r.id === recipeId);

  const handleSave = (updatedRecipe: RecipeType) => {
    const index = state.findIndex(r => r.id === recipeId);
    if (index !== -1) {
      state[index] = updatedRecipe;
      alert(`Рецепт "${updatedRecipe.name}" успешно изменен!`);
      navigate(`/${recipe?.category()}/recipe/${recipeId}`, { replace: true });
    }
  };

  if (!recipe) {
    return <div>Рецепт не найден</div>;
  }

  return (
    <EditRecipeForm 
      initialData={recipe}
      onSave={handleSave}
      onCancel={() => navigate(-1)}
    />
  );
}