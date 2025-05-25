import './Category.css'; // Импорт стилей

export default function ChooseCategory({categoryId, onCategoryChange}: {
    categoryId: number | null,
    onCategoryChange: (categoryId: number) => void
}) {
    const categories = [
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
                {categories.map(category => (
                    <button
                        key={category.id}
                        type="button"
                        className={`category-button ${
                            categoryId === category.id ? "category-button-selected" : ""
                        }`}
                        onClick={() => onCategoryChange(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    )
}