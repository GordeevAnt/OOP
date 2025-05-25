import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteMatch,
  useParams,
  Routes,
  Outlet,
} from 'react-router-dom';

type Recipe = {
    name: null,
    img: null,
    description: null,
}

function PageTitle({ title } : { title : string }) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Зависимость от title, чтобы заголовок обновлялся при изменении props

  return null; // Этот компонент ничего не рендерит визуально
}

const About = () => <>
  <PageTitle title="О нас"/>
  <h1>Контакты</h1>
</>

/* Ярослав*/
const Table = () => <> 
  <PageTitle title="Меры и веса"/>
  <h1>Таблица мер и весов</h1>
</>

/* Ярослав*/
const ChangeRecipe = () => <>
  <PageTitle title="Изменение рецепта"/>
  <h1>Новый рецепт</h1>
</>

/* Ярослав*/
const AddRecipe = () => <>
  <PageTitle title="Добавление рецепта"/>
  <h1>Новый рецепт</h1>
</>

/* Иван */
const RandomRecipe = () => <>
  <PageTitle title="Случайный рецепт"/>
  <h1>Рецепт наугад</h1>
</>

function MainPageRecipeList() { // Главная страница с категориями рецептов
  return (
    <div className='main-page'>
      <h1>Категории рецептов</h1>
      <div className='recipe-categories'>
        <Link to="/first-courses">Первые блюда</Link>
        <Link to="/second-courses">Вторые блюда</Link>
        <Link to="/snacks">Закуски</Link>
        <Link to="/drinks">Напитки</Link>
        <Link to="/desserts">Десерты</Link>
      </div>
      <Outlet/>
    </div>
  );
}

/* Иван */
function SameRecipes() {
  return(<div className='same-recipes'></div>);
}

/* Иван */
function Recipe() { // Страница с выбранным блюдом
  return (
    <div className='recipe'>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
      <h2>Рецепт</h2>
      <p>Здесь будет отображаться подробная информация о рецепте.</p>
    </div>
  );
}

function RecipePage({ categoryID }: { categoryID: number }/*Категория рецептов*/) { // Страница, которая отображает блюда выбранной категории
  let title: string;
  switch (categoryID) {
    case 1:
      title = "Закуски";
      break;
    case 2:
      title = "На первое";
      break;
    case 3:
      title = "На второе";
      break;
    case 4:
      title = "Напитки";
      break;
    case 5:
      title = "Десерты";
      break;
    default:
      title = "Рецепты";
  }

  return (
    <div className='recipe-page'>
      <PageTitle title={title} />
      <Recipe />
    </div>
  );
}


export default function App(){
  return (
    <Router>
      <header>
        <Link to="/" className='main-button'>Главная</Link>
        <input placeholder='Поиск'></input>
        <Link to="/newRecipe" className='header-button'>Добавить рецепт</Link>
        <Link to="/randomRecipe" className='header-button'>Рецепт наугад</Link>
        <Link to="/table" className='header-button'>Меры и веса</Link>
        <Link to="/about" className='header-button'>Контакты</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPageRecipeList/>}>
            <Route path='snacks' element={<RecipePage categoryID={1} />} />
            <Route path='first-courses' element={<RecipePage categoryID={2} />} />
            <Route path='second-courses' element={<RecipePage categoryID={3} />} />
            <Route path='drinks' element={<RecipePage categoryID={4} />} />
            <Route path='desserts' element={<RecipePage categoryID={5} />} />
            <Route index element={<PageTitle title="Главная" />} />
          </Route>
          <Route path='/newRecipe' element={<AddRecipe/>} />
          <Route path='/randomRecipe' element={<RandomRecipe/>} />
          <Route path='/table' element={<Table/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </main>
    </Router>
  );
}