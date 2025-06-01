import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
<<<<<<< HEAD

import { useEffect, useState } from 'react';
import { RecipeType } from '../entities/data';
=======
>>>>>>> baccfc3 (Updated Routes)
import AddRecipePage from '../pages/new-recipe-adding-page/new-recipe-adding-page';
import { CategoryList } from '../widgets/category-navi/category-navi';
import RecipePage from '../pages/recipe-page/recipe-page';
import './styles.css'
import RandomRecipePage from '../pages/random-recipe-page/random-recipe-page';
import EditRecipePage from '../widgets/edit-recipe-form/edit-recipe-page';
import FavoritesPage from "../pages/favorites-page/favorites-page";
import { RecipesProvider } from './recipes-context';
import NotFoundPage from '../pages/NotFoundPage';
<<<<<<< HEAD

function AppContent() {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);
  const [, setSelectedRecipe] = useState<RecipeType | null>(null);
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
              <li>
                <SearchBar 
                  recipes={filteredRecipes}
                  onSelectRecipe={setSelectedRecipe}
                />
              </li>
              <li>
                <RecipeFilter 
                  state={state} 
                  onFilter={setFilteredRecipes} 
                />
              </li>
          </ul>
        </nav>
      </header>
=======
import { Header } from './header';
import CategoryPage from '../pages/category-page/category-page';

function AppContent() {
  return (
    <>
      <Header/>
>>>>>>> baccfc3 (Updated Routes)
      <main>
        <Routes>
          <Route path="/" element={<CategoryList />}>
            <Route index element={<CategoryPage />} />
            <Route path=":category" element={<CategoryPage />} />
          </Route>
          <Route path=":category/recipe/:id" element={<RecipePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/edit-recipe/:id" element={<EditRecipePage />} />
          <Route path="/new-recipe" element={<AddRecipePage />} />
          <Route path="/random-recipe" element={<RandomRecipePage />} />
          <Route path="*" element={<NotFoundPage />} />
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