import { useState } from "react";
import { getCategory, getCookingTime, getDifficulty, getEatingTime, RecipeType } from "../entities/data";
import PageTitle from "../shared/page-title";
import InputName from "../widgets/add-new-recipe/recipe-name/recipe-name";
import ChooseCategory from "../widgets/add-new-recipe/category/category";
import ChooseEatingTime from "../widgets/add-new-recipe/eating-time/eating-time";
import AddIngredients from "../widgets/add-new-recipe/ingredients/ingredients";
import AddTodoList from "../widgets/add-new-recipe/todo-list/todo-list";
import { IngredientType } from "../entities/ingredints-data";
import ImageUploader from "../widgets/add-new-recipe/image-uploader/image-uploader";
import Difficulty from "../widgets/add-new-recipe/difficulty/difficulty";
import ChooseCookingTime from "../widgets/add-new-recipe/cookingTime/cookingTime";
import { useRecipes } from "../app/recipes-context";


export default function AddRecipe() {
  const { addRecipe } = useRecipes();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [eatingTimeId, setEatingTime] = useState<number | null>(null)
  const [difficultyId, setDifficultyId] = useState<number | null>(null)
  const [cookingTimeId, setCookingTime] = useState<number | null>(null)
  const [ingredients, setIngredients] = useState<IngredientType[]>([])
  const [todoList, setTodoList] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [resetImageUploader, setResetImageUploader] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || categoryId === null || eatingTimeId === null || ingredients.length === 0 || difficultyId === null || cookingTimeId === null) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const newRecipe: RecipeType = {
      id: Date.now(),
      name,
      img: imageUrl,
      favorite: false,
      categoryId,
      category: function() { return getCategory(this.categoryId) },
      eatingTimeId,
      eatingTime: function() { return getEatingTime(this.eatingTimeId) },
      difficultyId,
      difficulty: function() { return getDifficulty(this.difficultyId) },
      cookingTimeId,
      cookingTime: function() { return getCookingTime(this.cookingTimeId) },
      ingredients,
      todoList
    };

    addRecipe(newRecipe); // Используем функцию из контекста вместо прямого push
    
    // Сброс формы
    setName('');
    setTodoList('');
    setCategoryId(null);
    setEatingTime(null);
    setDifficultyId(null);
    setCookingTime(null);
    setIngredients([]);
    setImageUrl('/img/default-recipe.png');
    setResetImageUploader(prev => !prev);
    
    alert(`Рецепт "${newRecipe.name}" успешно добавлен!`);
  };

  return (
    <div className="add-recipe-form">
      <PageTitle title="Добавление рецепта" />
      <h1>Новый рецепт</h1>
      
      <form onSubmit={handleSubmit}>
        <InputName name={name} onNameChange={setName} />
        <ImageUploader onImageUpload={setImageUrl} resetTrigger={resetImageUploader} />
        <ChooseCategory categoryId={categoryId} onCategoryChange={setCategoryId} />
        <ChooseEatingTime eatingTimeId={eatingTimeId} onTimeChange={setEatingTime} />
        <Difficulty difficaltyId={difficultyId} onDifficaltyChange={setDifficultyId} />
        <ChooseCookingTime cookingTimeId={cookingTimeId} onTimeChange={setCookingTime} />
        <AddIngredients ingredients={ingredients} onIngredientsChange={setIngredients} />
        <AddTodoList todoList={todoList} onTodoListChange={setTodoList} />
        
        <button type="submit" className="submit-button">
          Сохранить рецепт
        </button>
      </form>
    </div>
  );
}