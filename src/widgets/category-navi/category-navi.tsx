import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './CategoryNavi.css';

export const categories = [
  { path: '', name: 'Все рецепты', id: 'all' },
  { path: 'snacks', name: 'Закуски', id: '1' },
  { path: 'first-courses', name: 'Первые блюда', id: '2' },
  { path: 'second-courses', name: 'Вторые блюда', id: '3' },
  { path: 'drinks', name: 'Напитки', id: '4' },
  { path: 'desserts', name: 'Десерты', id: '5' },
];

export function CategoryList() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/')[1] || '';

  return (
    <div className='category-nav-container'>
      <ul className='category-nav-list'>
        {categories.map((category) => (
          <li 
            key={category.path || 'all'}
            className={`category-nav-item ${
              currentPath === category.path ? 'active' : ''
            }`}
            onClick={() => navigate(`/${category.path}`)}
          >
            <Link to={`/${category.path}`} className="category-nav-link">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}