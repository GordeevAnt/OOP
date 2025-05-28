import './Category.css'; // Импорт стилей

export default function ChooseCategory({categoryId, onCategoryChange}: { // Объявление Компонента Выбора категории
    categoryId: number | null, // Пропс являющийся состоянием из компонента AddRecipe
    onCategoryChange: (categoryId: number) => void // Callback-функция из соответствующего состояния из AddRecipe, устанавливает значение для состояния
}) {
    const categories = [ // Массив объектов предопределяющий категории
        { id: 1, name: "Закуска" },
        { id: 2, name: "Первое блюдо" },
        { id: 3, name: "Второе блюдо" },
        { id: 4, name: "Напиток" },
        { id: 5, name: "Десерт" }
    ]

    return (
        <div className="category-container">
            <label className="category-label">Категория</label>
            <div className="category-buttons">
                {categories.map(category => ( // Через метод map создаем массив категорий и выводим его в виде списка кнопок
                    <button
                        key={category.id}
                        type="button"
                        className={`category-button ${
                            categoryId === category.id ? "category-button-selected" : ""
                        }`}
                        onClick={() => onCategoryChange(category.id)} // Изменяем значение состояния из AddRecipe на значение из выбранной кнопки
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    )
}