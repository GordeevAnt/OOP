import { useRef, useState } from "react";
import Select from 'react-select';
import { IngredientType, UnitType, Units, ingredientsList } from "../../../entities/ingredints-data";
import './Ingredients.css';

type Props = {
    ingredients: IngredientType[],
    onIngredientsChange: (ingredients: IngredientType[]) => void
};

export default function AddIngredients({ ingredients, onIngredientsChange }: Props) {
    const [selectedIngredient, setSelectedIngredient] = useState<IngredientType | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<UnitType>('гр');
    const inputRefs = useRef<{[key: number]: HTMLInputElement | null}>({});

    const handleAddIngredient = () => {
        if (selectedIngredient && !ingredients.some(ing => ing.id === selectedIngredient.id)) {
            onIngredientsChange([
                ...ingredients, 
                { 
                    ...selectedIngredient,
                    units: selectedUnit,
                    count: 0
                }
            ]);
            setSelectedIngredient(null);
        }
        else alert("Этот ингредиент уже добавлен")
    }

    const handleRemoveIngredient = (tempId: number) => {
        onIngredientsChange(ingredients.filter(ing => ing.id !== tempId));
    };

    const handleCountChange = (tempId: number, newCount: number | string) => {
        // Если ввод пустой, устанавливаем count в 0 (или можно null, если это допустимо в вашей логике)
        if (newCount === "") {
            onIngredientsChange(ingredients.map(ing => 
                ing.id === tempId ? { ...ing, count: 0 } : ing
            ));
            return;
        }

        // Проверяем, что значение - число
        const numericValue = typeof newCount === 'string' ? parseFloat(newCount) : newCount;
        
        if (isNaN(numericValue)) {
            alert("Пожалуйста, введите числовое значение");
            return;
        }

        // Проверяем, что значение больше 0
        if (numericValue < 0) {
            alert("Значение должно быть больше нуля");
            return;
        }

        // Обновляем значение
        onIngredientsChange(ingredients.map(ing => 
            ing.id === tempId ? { ...ing, count: numericValue } : ing
        ));
    };

    const handleUnitChange = (tempId: number, newUnit: UnitType) => {
        onIngredientsChange(ingredients.map(ing => 
            ing.id === tempId ? { ...ing, units: newUnit } : ing
        ));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, ingredientId: number) => {
        if (e.key === 'Enter') {
            const input = inputRefs.current[ingredientId];
            if (input) {
                input.blur();
            }
        }
    };

    return (
        <div className="ingredients-container">
            <label className="ingredients-label">Ингредиенты</label>
            <div className="ingredients-input-group">
                <Select
                    className="ingredients-select"
                    options={ingredientsList}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    value={selectedIngredient}
                    onChange={(selected) => setSelectedIngredient(selected)}
                    placeholder="Выберите ингредиент..."
                    noOptionsMessage={() => "Ингредиент не найден"}
                    isSearchable
                />
                <button 
                    type="button" 
                    className="ingredients-add-button"
                    onClick={handleAddIngredient}
                    disabled={!selectedIngredient}
                >
                    +
                </button>
            </div>
            
            <ul className="ingredients-list">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="ingredients-item">
                        <span className="ingredients-text">
                            {ingredient.name}
                        </span>
                        <div className="ingredients-count-controls">
                            <button
                                type="button"
                                className="ingredients-count-btn"
                                onClick={() => handleCountChange(ingredient.id, (ingredient.count || 0) - 1)}
                                disabled={ingredient.count <= 0}
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={ingredient.count === 0 ? "" : ingredient.count}
                                onChange={(e) => 
                                    handleCountChange(ingredient.id, e.target.value)
                                }
                                onBlur={(e) => {
                                    if (e.target.value === "") {
                                        handleCountChange(ingredient.id, 1);
                                    }
                                }}
                                className="ingredients-count-input"
                                onKeyDown={(e) => handleKeyDown(e, ingredient.id)}
                                ref={(el) => inputRefs.current[ingredient.id] = el}
                            />
                            <button
                                type="button"
                                className="ingredients-count-btn"
                                onClick={() => handleCountChange(ingredient.id, (ingredient.count || 0) + 1)}
                            >
                                +
                            </button>
                            <select
                                className="ingredients-unit-select"
                                value={ingredient.units}
                                onChange={(e) => 
                                    handleUnitChange(ingredient.id, e.target.value as UnitType)
                                }
                            >
                                {Units.map(unit => (
                                    <option key={unit} value={unit}>{unit}</option>
                                ))}
                            </select>
                            <button 
                                type="button" 
                                className="ingredients-remove-button"
                                onClick={() => handleRemoveIngredient(ingredient.id)}
                            >
                                ×
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}