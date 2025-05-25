import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { useEffect, useState } from 'react';
import { RecipeType } from '../entities/data';
import AddRecipePage from '../pages/new-recipe-adding-page/new-recipe-adding-page';
import { CategoryList, routes } from '../widgets/category-navi/category-navi';
import RecipePage from '../pages/recipe-page/recipe-page';
import SidePanel from '../widgets/sidebar/side-panel';
import SearchBar from '../widgets/search-bar/search-bar';
import './styles.css'
import { HomeIcon } from '../widgets/home-icon/home-icon';
import RandomRecipePage from '../pages/random-recipe-page/random-recipe-page';
import EditRecipePage from '../widgets/edit-recipe-form/edit-recipe-page';
import FavoritesPage from "../pages/favorites-page/favorites-page";
import RecipeFilter from '../widgets/recipe-filter/recipe-filter';
import { RecipesProvider, useRecipes } from './recipes-context';


function AppContent() {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const { state } = useRecipes();

  // Обновляем отфильтрованные рецепты при изменении основного списка
  useEffect(() => {
    setFilteredRecipes(state);
  }, [state]);

  return (
    <Router>
      <header>
        <nav className='navbar'>
          <ul className='nav-list'>
              <li><SidePanel /></li>
              <li><HomeIcon /></li>
              <li><SearchBar recipes={filteredRecipes} onSelectRecipe={setSelectedRecipe}/></li>
              <li><RecipeFilter state={state} onFilter={setFilteredRecipes}/></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CategoryList />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
          <Route path='/:categoryId/recipe/:id' element={<RecipePage />} />
          <Route path='/newRecipe' element={<AddRecipePage />} />
          <Route path='/randomRecipe' element={<RandomRecipePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default function App() {
  return (
    <RecipesProvider>
      <AppContent />
    </RecipesProvider>
  );
}