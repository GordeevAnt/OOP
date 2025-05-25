import { useState, useEffect } from "react";
import { Units, UnitType, IngredientType } from "../../../entities/ingredints-data";
import "./units-converter.css";

type ConversionTable = {
  [key in UnitType]: {
    [key in UnitType]?: number;
  };
};

const conversions: ConversionTable = {
  'мл': { 'л': 0.001, 'гр': 1, 'кг': 0.001 },
  'л': { 'мл': 1000, 'гр': 1000, 'кг': 1 },
  'гр': { 'мл': 1, 'л': 0.001, 'кг': 0.001 },
  'кг': { 'мл': 1000, 'л': 1, 'гр': 1000 }
};

export const convertUnits = (value: number, from: UnitType, to: UnitType): number => {
  if (from === to) return value;
  
  const conversionRate = conversions[from][to];
  if (conversionRate === undefined) {
    throw new Error(`Conversion from ${from} to ${to} is not supported`);
  }
  
  return value * conversionRate;
};

export const UnitConverter = ({ ingredient }: { ingredient: IngredientType }) => {
  const [displayValue, setDisplayValue] = useState<string>(ingredient.count.toString());
  const [currentCount, setCurrentCount] = useState<number>(ingredient.count);
  const [currentUnit, setCurrentUnit] = useState<UnitType>(ingredient.units);

  useEffect(() => {
    setDisplayValue(ingredient.count.toString());
    setCurrentCount(ingredient.count);
    setCurrentUnit(ingredient.units);
  }, [ingredient]);

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as UnitType;
    const convertedCount = convertUnits(currentCount, currentUnit, newUnit);
    setCurrentUnit(newUnit);
    setCurrentCount(convertedCount);
    setDisplayValue(convertedCount.toString());
  };

  return (
    <div className="ingredient-row">
      <span className="ingredient-name">{ingredient.name}</span>
      <label className="ingredient-value">
        {parseFloat(displayValue).toFixed(2)}
      </label>
      <select 
        value={currentUnit} 
        onChange={handleUnitChange}
        className="select_ingredient_unit"
      >
        {Units.map(unit => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>
    </div>
  );
};