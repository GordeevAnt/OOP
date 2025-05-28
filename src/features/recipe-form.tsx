// features/recipe-form/recipe-form.tsx
import { useState } from 'react';
import { RecipeType } from '../entities/data';

interface RecipeFormProps {
  initialData: RecipeType;
  onSubmit: (recipe: RecipeType) => void;
}

export default function RecipeForm({ initialData, onSubmit }: RecipeFormProps) {
  const [recipe, setRecipe] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <div className="form-group">
        <label>Название:</label>
        <input 
          value={recipe.name} 
          onChange={(e) => setRecipe({...recipe, name: e.target.value})}
        />
      </div>
      
      {/* Добавьте остальные поля формы */}
      
      <button type="submit" className="submit-btn">
        Сохранить изменения
      </button>
    </form>
  );
}