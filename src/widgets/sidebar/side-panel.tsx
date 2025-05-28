import { useState, useRef, useEffect } from 'react';
import './SidePanel.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecipes } from '../../app/recipes-context';

export default function SidePanel() {
  const { state } = useRecipes()
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (savedFavorites.length > 0) {
      state.forEach(recipe => {
        recipe.favorite = savedFavorites.includes(recipe.id);
      })
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleItemClick = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && <div className="panel-overlay" />}
      
      <button 
        ref={buttonRef}
        className={`panel-toggle-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="button-icon">{isOpen ? '✕' : '☰'}</span>
      </button>
      
      <div 
        ref={panelRef}
        className={`side-panel ${isOpen ? 'open' : ''}`}
      >
        <div className="panel-content">
          <ul>
            <li 
              className={location.pathname === '/' ? 'active-item' : ''}
              onClick={() => handleItemClick('/')}
            >
              <Link to="/">Главная</Link>
            </li>
            <li 
              className={location.pathname === '/newRecipe' ? 'active-item' : ''}
              onClick={() => handleItemClick('/newRecipe')}
            >
              <Link to="/newRecipe">Добавить рецепт</Link>
            </li>
            <li 
              className={location.pathname === '/randomRecipe' ? 'active-item' : ''}
              onClick={() => handleItemClick('/randomRecipe')}
            >
              <Link to="/randomRecipe">Случайный рецепт</Link>
            </li>
            <li 
              className={location.pathname === '/favorites' ? 'active-item' : ''}
              onClick={() => handleItemClick('/favorites')}
            >
              <Link to="/favorites">
                Избранное
                <span className="favorites-count">
                  {state.filter(r => r.favorite).length}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}