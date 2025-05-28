import { useState } from "react";
import { getCategory, getCookingTime, getDifficulty, getEatingTime, RecipeType } from "../entities/data";
import PageTitle from "../shared/page-title";
import InputName from "../widgets/add-new-recipe/recipe-name/recipe-name";
import ChooseCategory from "../widgets/add-new-recipe/category/category";
import ChooseEatingTime from "../widgets/add-new-recipe/eating-time/eating-time";
import AddIngredients from "../widgets/add-new-recipe/ingredients/ingredients";
import AddTodoList from "../widgets/add-new-recipe/todo-list/todo-list";
import { IngredientType } from "../entities/ingredints-data";
import ImageUploader from "../widgets/add-new-recipe/image-uploader/image-uploader";
import Difficulty from "../widgets/add-new-recipe/difficulty/difficulty";
import ChooseCookingTime from "../widgets/add-new-recipe/cookingTime/cookingTime";
import { useRecipes } from "../app/recipes-context"; // Импортируем кастомный хук из контекста


export default function AddRecipe() { // Объявление компонента для добавления рецепта
  const { addRecipe } = useRecipes() // Достаем функцию из объекта RecipeContext для добавления рецепта из контекста
  const [name, setName] = useState<string>('') // Состояние для названия рецепта, только строка
  const [categoryId, setCategoryId] = useState<number | null>(null) // Состояние для выбора категории рецепта, либо null, либо число
  const [eatingTimeId, setEatingTime] = useState<number | null>(null) // Состояние для выбора времени приема пищи, либо null, либо число
  const [difficultyId, setDifficultyId] = useState<number | null>(null) // Состояние для выбора сложности, либо null, либо число
  const [cookingTimeId, setCookingTime] = useState<number | null>(null) // Состояние для выбора времени приготовления, либо null, либо число
  const [ingredients, setIngredients] = useState<IngredientType[]>([]) // Состояние для списка ингредиентов, массив объектов типа IngredientTypе, *изначально пустой*
  const [todoList, setTodoList] = useState<string>('') // Состояние для инструкции по приготовлению, только строка
  const [imageUrl, setImageUrl] = useState<Base64URLString>('') // Состояние для пути к изображению, только строка
  const [resetImageUploader, setResetImageUploader] = useState<boolean>(false) // Состояния для очистки поля загрузки изображения, тип булеан (true | false)

  const handleSubmit = (e: React.FormEvent) => { // Функция в которой реализованна основная логика заполнения полей рецепта
    e.preventDefault() // Отключаем *стандартное поведение формы*, тоесть Реакт сам контролирует обработку данных, без перезагрузки (если без этйо строчки то будет перезагрузка и работать корреектно не будет)
    
    if (!name || categoryId === null || eatingTimeId === null || ingredients.length === 0 || difficultyId === null || cookingTimeId === null) { // Проверка заполненны ли необходимые поля!
      alert('Пожалуйста, заполните все обязательные поля') // Выводим предупреждение через Alert 
      return // Выходим из функции
    }

    const newRecipe: RecipeType = { // Создаем объект (рецепт) используя состояния
      id: Date.now(), // Генерируем уникальный id, просто выбирая текущее время
      name, // Используем состоние для названия рецепта
      img: imageUrl, // Используем состоние пути к изображение текущего рецепта
      favorite: false, // Устанавливаем значение поля избранное false, тоесть рецепт не будет находится в избранном после создания
      categoryId, // Используем состоние для категории рецепта
      category: function() { return getCategory(this.categoryId) }, // Вычисляем категорию с помощью функции, через число (ключ) categoryId
      eatingTimeId, // Также как и с категориями
      eatingTime: function() { return getEatingTime(this.eatingTimeId) }, // Также как и с категориями
      difficultyId, // Также как и с категориями
      difficulty: function() { return getDifficulty(this.difficultyId) }, // Также как и с категориями
      cookingTimeId, // Также как и с категориями
      cookingTime: function() { return getCookingTime(this.cookingTimeId) }, // Также как и с категориями
      ingredients, // Используем состоние хранящее список из выбранных ингредиентов
      todoList // Используем состоние для интсрукции по приготовлению
    };

    addRecipe(newRecipe) // Используем функцию из контекста вместо прямого push
    
    // Сброс формы
    setName(''); // Очищаем поле ввода имени
    setTodoList(''); // Очищаем поле для ввода инструкции
    setCategoryId(null); // Уставаливаем состоянию значение null, тоесть кнопки будут не выбраны
    setEatingTime(null); // Аналогично категории
    setDifficultyId(null); // Аналогично категории
    setCookingTime(null); // Аналогично категории
    setIngredients([]); // Очищаем состояние хранящее массив ингредиентов
    setImageUrl(''); // Очищаем путь к изображению
    setResetImageUploader(prev => !prev); // Меняем значение ResetImageUploader на противоположное (был true стало false, и наоборот)
    
    alert(`Рецепт "${newRecipe.name}" успешно добавлен!`); // Если всё прошло успешно выводим уведомление через алерт
  };

  return ( // html часть компонента, стоящая из DOM-элементов
    <div className="add-recipe-form"> {/* Общий блок див для стилей формы */}
      <PageTitle title="Добавление рецепта" /> {/* Меняем титульник страницы на название компонента */}
      <h1>Новый рецепт</h1> {/* Заголовок Формы */}
      
      <form onSubmit={handleSubmit}> {/* Форма вызывает handleSubmit через обработчки onSubmit */}
        <InputName name={name} onNameChange={setName} /> {/* Компонент для ввода названия рецепта */}
        <ImageUploader onImageUpload={setImageUrl} resetTrigger={resetImageUploader} /> {/* Большой комопнент для загрузки изображения из файлов */}
        <ChooseCategory categoryId={categoryId} onCategoryChange={setCategoryId} /> {/* Компонент для выбора категории */}
        <ChooseEatingTime eatingTimeId={eatingTimeId} onTimeChange={setEatingTime} /> {/* ^ */}
        <Difficulty difficaltyId={difficultyId} onDifficaltyChange={setDifficultyId} /> {/* ^ */}
        <ChooseCookingTime cookingTimeId={cookingTimeId} onTimeChange={setCookingTime} /> {/* ^ */}
        <AddIngredients ingredients={ingredients} onIngredientsChange={setIngredients} /> {/* Компонент для выбора рецептов из массива рецептов */}
        <AddTodoList todoList={todoList} onTodoListChange={setTodoList} /> {/* Компонент для ввода инструкции по приготовлению */}
        
        <button type="submit" className="submit-button"> {/* Кнопка вызывающая обработчик onSubmit */}
          Сохранить рецепт
        </button>
      </form>
    </div>
  );
}