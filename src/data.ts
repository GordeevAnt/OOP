export type RecipeType = {
    id: number,
    name: string,
    categoryId: number,
    category: () => string,
    eatingTime: string,
    ingredients: string[],
}

// Функция для подсчета ID категории (на будущее)
const getCategory = (id: number): string => {
    switch (id) {
    case 0: return "Закуска"
    case 1: return "Первое блюдо"
    case 2: return "Второе блюдо"
    case 3: return "Напиток"
    case 4: return "Десерт"
    default: return "Другое"
  }
}

export const recipes: RecipeType[] = [
    {
        id: 0,
        name: "Бананы в шоколаде",
        categoryId: 4,
        category: function() { return getCategory(this.categoryId) },
        eatingTime: "Не определено",
        ingredients: ["Бананы","Молочный шоколад","Сахар"]
    },
    {
        id: 1,
        name: "Торт",
        categoryId: 4,
        category: function() { return getCategory(this.categoryId) },
        eatingTime: "Не определено",
        ingredients: ["Мука","Яйцо","Сахар"]
    },
    {
        id: 2,
        name: "Мороженное",
        categoryId: 4,
        category: function() { return getCategory(this.categoryId) },
        eatingTime: "Не определено",
        ingredients: ["Молоко","Лед","Сахар"]
    },
    {
        id: 3,
        name: "Омлет",
        categoryId: 1,
        category: function() { return getCategory(this.categoryId) },
        eatingTime: "Завтрак",
        ingredients: ["Куриные яйца","Соль","Молоко"],
    },
]