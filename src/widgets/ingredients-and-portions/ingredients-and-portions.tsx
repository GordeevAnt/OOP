import { useEffect, useRef, useState } from "react";
import { RecipeType } from "../../entities/data";
import { convertUnits, UnitConverter } from "./units-convector/units-converter";
import { ingredientsList, UnitType } from "../../entities/ingredints-data";

export default function IngredientsAndPortions ({recipe} : {recipe: RecipeType}) {
    const [portions, setPortions] = useState(1);
    const [inputValue, setInputValue] = useState("1");
    const [showAlert, setShowAlert] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const calculateCalories = () => {
        return recipe.ingredients.reduce((total, ingredient) => {   
            const startCount = ingredientsList.find(ing => ing.id === ingredient.id)?.count || 0;
            const startUnit = ingredientsList.find(ing => ing.id === ingredient.id)?.units || 'гр'; // Значение по умолчанию
            
            // Проверяем, что startUnit валиден (на случай, если в данных ошибка)
            const safeStartUnit: UnitType = ['мл', 'л', 'гр', 'кг'].includes(startUnit) 
                ? startUnit as UnitType 
                : 'гр';

            const convertedValue = convertUnits(
                ingredient.count,
                ingredient.units,
                safeStartUnit
            );
        
            return total + (ingredient.calories * (convertedValue / startCount));
        }, 0);
    };

    useEffect(() => {
        setInputValue(portions.toString());
    }, [portions]);

    const handleIncreasePortions = () => {
        const newValue = portions + 1;
        if (newValue > 1000 && showAlert) {
            alert("Серьёзно? Ты собираешься накормить целую армию?");
        }
        setPortions(Math.min(newValue, 1000));
    };

    const handleDecreasePortions = () => {
        if (portions > 1) {
            setPortions(prev => prev - 1);
            setShowAlert(true);
        }
    };

    const handlePortionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || /^[1-9]\d*$/.test(value)) {
            setInputValue(value);
            setShowAlert(true);
        }
    };

    const validatePortions = () => {
        let value = inputValue.trim();
        
        if (value === "") {
            setPortions(1);
            return;
        }

        const num = parseInt(value);
        
        if (num > 1000 && showAlert) {
            alert("Серьёзно? Ты собираешься накормить целую армию?");
            setPortions(1000);
            setInputValue("1000");
        } else if (num < 1) {
            setPortions(1);
        } else {
            setPortions(Math.min(num, 1000));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            validatePortions();
            inputRef.current?.blur();
        }
    };

    return(
        <>
            <div className="portions-control">
                <h3>Ингредиенты</h3>
                <span>Порции: </span>
                <input 
                    ref={inputRef}
                    className="input-portions"
                    type="number" 
                    value={inputValue}
                    onChange={handlePortionsChange}
                    onBlur={validatePortions}
                    onKeyDown={handleKeyDown}
                    min="1"
                    max="1000"
                    pattern="[1-9]\d*"
                />
                <button className="increase-portions" onClick={handleIncreasePortions}>+</button>
                <button className="decrease-portions" onClick={handleDecreasePortions}>-</button>
            </div>

            <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        <UnitConverter 
                            ingredient={{
                                ...ingredient,
                                count: ingredient.count * portions
                            }} 
                        />
                    </li>
                ))}
            </ul>
            <label className="recipe_calories">Количество калорий: {calculateCalories() * portions}</label>
        </>
    )
}
