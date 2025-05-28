import { useState, useEffect, useRef } from 'react';
import { RecipeType } from "../../entities/data";
import ButtonLink from "../../shared/button-link/button-link-to-recipe";
import './RecipeCard.css';

export default function RecipeCard({ recipe }: { recipe: RecipeType }) {
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
      hoverTimeout.current = null
    }
    setIsHovered(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }
    }
  }, [])


  return (
    <div 
      className={`card ${isHovered ? 'card--hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`card-content ${isHovered ? 'card-content--blurred' : ''}`}>
        <img src={recipe.img} alt={recipe.name} className='small-image' />
        <h2 className='title'>{recipe.name}</h2>
        <p className='category'>Категория: {recipe.category()}</p>
        <p className='eatingTime'>Время употребления: {recipe.eatingTime()}</p>
        
        <h3 className='ingredientsTitle'>Ингредиенты:</h3>
        <ul className='ingredientsList'>
          {recipe.ingredients.slice(0,3).map((ingredient, index) => (
            <li key={`${ingredient.id}-${index}`} className='ingredientItem'>
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      {isHovered && (
        <div className="button-overlay">
          <ButtonLink 
            text="Перейти на страницу рецепта" 
            recipe={recipe} 
          />
        </div>
      )}
    </div>
  )
}