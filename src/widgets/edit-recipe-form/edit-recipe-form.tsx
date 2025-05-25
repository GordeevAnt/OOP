import { useState } from "react";
import { RecipeType } from "../../entities/data";
import InputName from "../add-new-recipe/recipe-name/recipe-name";
import ChooseCategory from "../add-new-recipe/category/category";
import ChooseEatingTime from "../add-new-recipe/eating-time/eating-time";
import AddIngredients from "../add-new-recipe/ingredients/ingredients";
import ImageUploader from "../add-new-recipe/image-uploader/image-uploader";
import "./edit-recipe-form.css";
import { useRecipes } from "../../app/recipes-context";
import Difficulty from "../add-new-recipe/difficulty/difficulty";
import ChooseCookingTime from "../add-new-recipe/cookingTime/cookingTime";


interface EditRecipeFormProps {
    initialData: RecipeType;
    onSave: (updatedRecipe: RecipeType) => void;
    onCancel: () => void;
  }

export default function EditRecipeForm({ initialData, onSave, onCancel }: EditRecipeFormProps) {
  const { updateRecipe } = useRecipes();
  const [name, setName] = useState(initialData.name);
  const [categoryId, setCategoryId] = useState(initialData.categoryId);
  const [eatingTimeId, setEatingTimeId] = useState(initialData.eatingTimeId);
  const [difficultyId, setDifficultyId] = useState(initialData.difficultyId);
  const [cookingTimeId, setCookingTimeId] = useState(initialData.cookingTimeId);
  const [ingredients, setIngredients] = useState(initialData.ingredients);
  const [imageUrl, setImageUrl] = useState(initialData.img);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedRecipe: RecipeType = {
      ...initialData,
      name,
      categoryId: categoryId || initialData.categoryId,
      eatingTimeId: eatingTimeId || initialData.eatingTimeId,
      difficultyId: difficultyId || initialData.difficultyId,
      cookingTimeId: cookingTimeId || initialData.cookingTimeId,
      ingredients,
      img: imageUrl
    };
    
    updateRecipe(updatedRecipe); // Используем функцию из контекста
    onSave(updatedRecipe);
  };

  return (
    <div className="edit-recipe-card">
      <h2>Редактирование рецепта</h2>
      
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="full-width">
          <InputName name={name} onNameChange={setName} />
        </div>
        
        <div className="full-width">
          <ImageUploader onImageUpload={setImageUrl} initialImage={initialData.img} />
        </div>
        
        <div className="section-container">
          <ChooseCategory 
            categoryId={categoryId} 
            onCategoryChange={setCategoryId} 
          />
        </div>
        
        <div className="section-container">
          <ChooseEatingTime 
            eatingTimeId={eatingTimeId} 
            onTimeChange={setEatingTimeId} 
          />
        </div>

        <div className="section-container">
          <Difficulty
            difficaltyId={difficultyId} 
            onDifficaltyChange={setDifficultyId} 
          />
        </div>
        
        <div className="section-container">
          <ChooseCookingTime 
            cookingTimeId={cookingTimeId} 
            onTimeChange={setCookingTimeId} 
          />
        </div>
        
        <div className="full-width">
          <AddIngredients 
            ingredients={ingredients} 
            onIngredientsChange={setIngredients} 
          />
        </div>
        
        <div className="full-width">
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="save-button">
              Сохранить изменения
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}