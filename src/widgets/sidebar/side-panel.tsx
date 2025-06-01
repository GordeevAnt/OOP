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
              className={location.pathname === '/new-recipe' ? 'active-item' : ''}
              onClick={() => handleItemClick('/new-recipe')}
            >
              <Link to="/new-recipe">Добавить рецепт</Link>
            </li>
            <li 
              className={location.pathname === '/random-recipe' ? 'active-item' : ''}
              onClick={() => handleItemClick('/random-recipe')}
            >
              <Link to="/random-recipe">Случайный рецепт</Link>
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