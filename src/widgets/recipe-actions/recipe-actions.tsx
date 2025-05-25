import { useEffect, useState } from "react";
import { RecipeType } from "../../entities/data";
import './recipe-actions.css';
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../../app/recipes-context";
import { jsPDF } from "jspdf";
import "../recipe-actions/Roboto-Regular-normal"

interface RecipeActionsProps {
  recipe: RecipeType
}

export default function RecipeActions({ recipe }: RecipeActionsProps) {
  const { updateRecipe, deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(recipe.favorite);

  useEffect(() => {
    setIsFavorite(recipe.favorite);
  }, [recipe.favorite]);

  const toggleFavorite = () => {
    const updatedRecipe = {
      ...recipe,
      favorite: !isFavorite
    };
    updateRecipe(updatedRecipe);
    setIsFavorite(updatedRecipe.favorite);
    
    const favoritesString = localStorage.getItem('favorites') || '[]';
    const favorites: number[] = JSON.parse(favoritesString) as number[];
    
    if (updatedRecipe.favorite) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, updatedRecipe.id]));
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter(id => id !== updatedRecipe.id)));
    }
  };

  const handleEdit = (recipeId: number) => {
    navigate(`/edit-recipe/${recipeId}`);
  };
    
  const handleDelete = (recipeId: number) => {
    if (confirm(`Удалить рецепт "${recipe.name}"?`)) {
      const favoritesString = localStorage.getItem('favorites') || '[]';
      const favorites: number[] = JSON.parse(favoritesString) as number[];
      localStorage.setItem('favorites', JSON.stringify(favorites.filter(id => id !== recipeId)));
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  const saveAsPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;
    let imageProcessed = false; // Флаг для отслеживания обработки изображения

    // Установка шрифта
    doc.setFont("Roboto-Regular", "normal");

    // Функция для проверки и добавления новой страницы
    const checkPageBreak = (requiredHeight: number) => {
      if (yPos + requiredHeight > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }
    };

    // Заголовок
    doc.setFontSize(20);
    checkPageBreak(25);
    doc.text(recipe.name, pageWidth / 2, yPos, { align: 'center' });
    yPos += 25;

    // Обработка изображения
    if (recipe.img) {
      const img = new Image();
      
      const handleImageLoad = () => {
        if (imageProcessed) return; // Защита от повторной обработки
        imageProcessed = true;
        
        try {
          // Рассчитываем размеры для вставки
          const maxWidth = pageWidth - 2 * margin;
          const ratio = Math.min(maxWidth / img.width, (pageHeight / 3) / img.height);
          const displayWidth = img.width * ratio;
          const displayHeight = img.height * ratio;

          // Проверяем место и вставляем изображение
          checkPageBreak(displayHeight);
          doc.addImage(
            recipe.img.startsWith('data:') ? recipe.img : img.src,
            getImageType(recipe.img),
            (pageWidth - displayWidth) / 2, yPos,
            displayWidth, displayHeight
          );
          yPos += displayHeight + 10;
        } catch (error) {
          console.error("Ошибка обработки изображения:", error);
        } finally {
          generatePdfContent();
        }
      };

      img.onload = handleImageLoad;
      img.onerror = () => {
        console.error("Ошибка загрузки изображения");
        generatePdfContent();
      };

      // Устанавливаем источник изображения
      if (recipe.img.startsWith('data:')) {
        img.src = recipe.img;
      } else {
        const fullPath = recipe.img.startsWith('/') ? recipe.img : `/img/${recipe.img}`;
        img.src = fullPath;
      }

      // Если изображение уже загружено (из кэша)
      if (img.complete) {
        handleImageLoad();
      }
    } else {
      generatePdfContent();
    }

    // Функция для генерации остального содержимого PDF
    function generatePdfContent() {
      // Основная информация
      doc.setFontSize(14);
      checkPageBreak(40);
      doc.text(`Категория: ${recipe.category()}`, margin, yPos);
      yPos += 10;
      doc.text(`Время приема: ${recipe.eatingTime()}`, margin, yPos);
      yPos += 10;
      doc.text(`Время приготовления: ${recipe.cookingTime()}`, margin, yPos);
      yPos += 10;
      doc.text(`Сложность: ${recipe.difficulty()}`, margin, yPos);
      yPos += 15;

      // Ингредиенты
      doc.setFontSize(16);
      checkPageBreak(10);
      doc.text('Ингредиенты:', margin, yPos);
      yPos += 10;

      doc.setFontSize(12);
      recipe.ingredients.forEach(ingredient => {
        checkPageBreak(7);
        doc.text(`- ${ingredient.name}: ${ingredient.count} ${ingredient.units}`, margin + 5, yPos);
        yPos += 7;
      });

      // Инструкции
      doc.setFontSize(16);
      checkPageBreak(10);
      doc.text('Инструкции:', margin, yPos);
      yPos += 10;

      doc.setFontSize(12);
      const instructions = recipe.todoList.split('\n');
      instructions.forEach(step => {
        const lines = doc.splitTextToSize(step, pageWidth - 2 * margin);
        lines.forEach((line: string | string[]) => {
          checkPageBreak(7);
          doc.text(line, margin + 5, yPos);
          yPos += 7;
        });
        yPos += 5;
      });

      doc.save(`${recipe.name}.pdf`);
    }

    // Вспомогательная функция для определения типа изображения
    function getImageType(imgPath: string): string {
      if (imgPath.startsWith('data:')) {
        return imgPath.split(';')[0].split('/')[1];
      }
      return imgPath.split('.').pop()?.toLowerCase() || 'jpg';
    }
  };

  return (
    <div className="recipe-actions-container">
      <button
        onClick={toggleFavorite}
        className={`recipe-action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
        aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      
      <button 
        onClick={() => handleEdit(recipe.id)} 
        className="recipe-action-btn edit-btn"
        aria-label="Редактировать"
      >
        ✏️
      </button>
      
      <button 
        onClick={() => handleDelete(recipe.id)} 
        className="recipe-action-btn delete-btn"
        aria-label="Удалить"
      >
        🗑️
      </button>

      <button 
        onClick={saveAsPdf} 
        className="recipe-action-btn pdf-btn"
        aria-label="Сохранить в PDF"
      >
        📄
      </button>
    </div>
  );
}