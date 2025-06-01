import {
  Route,
  Routes,
} from 'react-router-dom';
import AddRecipePage from '../pages/new-recipe-adding-page/new-recipe-adding-page';
import { CategoryList } from '../widgets/category-navi/category-navi';
import RecipePage from '../pages/recipe-page/recipe-page';
import './styles.css'
import RandomRecipePage from '../pages/random-recipe-page/random-recipe-page';
import EditRecipePage from '../widgets/edit-recipe-form/edit-recipe-page';
import FavoritesPage from "../pages/favorites-page/favorites-page";
import { RecipesProvider } from './recipes-context';
import NotFoundPage from '../pages/NotFoundPage';
import { Header } from './header';
import CategoryPage from '../pages/category-page/category-page';

function AppContent() {
  return (
    <>
      <Header/>
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
    </>
  );
}

export default function App() {
  return (
    <RecipesProvider>
      <AppContent />
    </RecipesProvider>
  );
}