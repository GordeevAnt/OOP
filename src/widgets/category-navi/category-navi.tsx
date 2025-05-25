import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import RecipePage from "../../pages/category-page/category-page";
import './CategoryNavi.css';

export const routes = [
  { path: '', element: <RecipePage />, name: 'Все рецепты' },
  { path: 'snacks', element: <RecipePage categoryID={1} />, name: 'Закуски' },
  { path: 'first-courses', element: <RecipePage categoryID={2} />, name: 'Первые блюда' },
  { path: 'second-courses', element: <RecipePage categoryID={3} />, name: 'Вторые блюда' },
  { path: 'drinks', element: <RecipePage categoryID={4} />, name: 'Напитки' },
  { path: 'desserts', element: <RecipePage categoryID={5} />, name: 'Десерты' },
];

export function CategoryList() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop() || '';

  return (
    <div className='category-nav-container'>
      <ul className='category-nav-list'>
        {routes.map((route) => (
          <li 
            key={route.path || 'all'}
            className={`category-nav-item ${
              (route.path === '' && currentPath === '') || 
              (route.path !== '' && currentPath === route.path) ? 'active' : ''
            }`}
            onClick={() => navigate(route.path)}
          >
            <Link to={route.path} className="category-nav-link">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}