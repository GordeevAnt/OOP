import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function App() {
  const handleSaveToPdf = () => {
    const element = document.getElementById('content-to-save'); // Получаем элемент

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("recipt_name" + ".pdf");
    });
  };

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">Контакты</Link>
            </li>
            <li>
              <Link to="/topics">Темы</Link>
            </li>
            <li>
              <button onClick={handleSaveToPdf}>Сохранить в PDF</button>
            </li>
          </ul>
        </nav>
      </header>

      <main id="content-to-save"> {/* Добавили id для захвата контента */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/topics/*" element={<Topics />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  );
}

const Home = () => <h2>Главная</h2>;

const About = () => <h2>Контакты</h2>;

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Зависимость от title, чтобы заголовок обновлялся при изменении props

  return null; // Этот компонент ничего не рендерит визуально
}

function Topics() {
  return (
    <>
      <PageTitle title="Темы"/>
      <h2>Темы</h2>

      <nav>
        <ul>
          <li>
            <Link to="/topics/components">Компоненты</Link>
          </li>
          <li>
            <Link to="/topics/props-vs-state">Пропы против состояния</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Routes>
          <Route path="/topics/:topicId" element={<Topic />} />
          <Route path="/topics" element={<h3>Пожалуйста, выберите тему.</h3>} />
        </Routes>
      </div>
    </>
  );
}


function Topic() {
  const { topicId } = useParams();
  return <h3>Идентификатор выбранной темы: {topicId}</h3>;
}