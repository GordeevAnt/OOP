export type UnitType = 'мл' | 'л' | 'гр' | 'кг';

export const Units: UnitType[] = ['мл' , 'л' , 'гр' , 'кг'];

export type IngredientType = {
  id: number;
  name: string;
  count: number;
  units: UnitType;
  calories: number;
};

export const ingredientsList: IngredientType[] = [
  { id: 0, name: "Мука пшеничная", count: 500, units: "гр", calories: 1700 }, 
  { id: 1, name: "Сахар белый", count: 200, units: "гр", calories: 800 }, 
  { id: 2, name: "Соль поваренная", count: 15, units: "гр", calories: 0 },
  { id: 3, name: "Молоко 3.2%", count: 250, units: "мл", calories: 155 }, 
  { id: 4, name: "Вода питьевая", count: 500, units: "мл", calories: 0 }, 
  { id: 5, name: "Масло подсолнечное", count: 30, units: "мл", calories: 270 }, 
  { id: 6, name: "Яйцо куриное", count: 60, units: "гр", calories: 94 }, 
  { id: 7, name: "Дрожжи сухие", count: 10, units: "гр", calories: 35 }, 
  { id: 8, name: "Рис белый", count: 300, units: "гр", calories: 1110 }, 
  { id: 9, name: "Гречневая крупа", count: 250, units: "гр", calories: 850 }, 
  { id: 10, name: "Овсяные хлопья", count: 150, units: "гр", calories: 585 }, 
  { id: 11, name: "Манная крупа", count: 200, units: "гр", calories: 700 }, 
  { id: 12, name: "Кукурузная крупа", count: 180, units: "гр", calories: 630 },
  { id: 13, name: "Пшено", count: 220, units: "гр", calories: 770 }, 
  { id: 14, name: "Макароны", count: 400, units: "гр", calories: 1400 },
  { id: 15, name: "Томатная паста", count: 100, units: "гр", calories: 80 }, 
  { id: 16, name: "Мёд натуральный", count: 120, units: "гр", calories: 360 }, 
  { id: 17, name: "Уксус столовый", count: 50, units: "мл", calories: 13 }, // 25 ккал/100мл
  { id: 18, name: "Сода пищевая", count: 5, units: "гр", calories: 0 }, // 0 ккал
  { id: 19, name: "Крахмал картофельный", count: 30, units: "гр", calories: 105 }, // 350 ккал/100г
  { id: 20, name: "Какао-порошок", count: 40, units: "гр", calories: 160 }, // 400 ккал/100г
  { id: 21, name: "Кофе молотый", count: 25, units: "гр", calories: 8 }, // ~32 ккал/100г (без учета напитка)
  { id: 22, name: "Чай чёрный", count: 10, units: "гр", calories: 3 }, // ~30 ккал/100г (без учета напитка)
  { id: 23, name: "Сливки 20%", count: 200, units: "мл", calories: 440 }, // 220 ккал/100мл
  { id: 24, name: "Сметана 15%", count: 150, units: "гр", calories: 240 }, // 160 ккал/100г
  { id: 25, name: "Творог", count: 300, units: "гр", calories: 330 }, // 110 ккал/100г (5%)
  { id: 26, name: "Сыр твёрдый", count: 200, units: "гр", calories: 800 }, // 400 ккал/100г
  { id: 27, name: "Масло сливочное", count: 100, units: "гр", calories: 750 }, // 750 ккал/100г
  { id: 28, name: "Маргарин", count: 80, units: "гр", calories: 600 }, // 750 ккал/100г
  { id: 29, name: "Кефир", count: 250, units: "мл", calories: 150 }, // 60 ккал/100мл (2.5%)
  { id: 30, name: "Йогурт натуральный", count: 125, units: "гр", calories: 88 }, // 70 ккал/100г
  { id: 31, name: "Майонез", count: 100, units: "гр", calories: 680 }, // 680 ккал/100г
  { id: 32, name: "Горчица", count: 30, units: "гр", calories: 36 }, // 120 ккал/100г
  { id: 33, name: "Кетчуп", count: 150, units: "гр", calories: 165 }, // 110 ккал/100г
  { id: 34, name: "Лук репчатый", count: 100, units: "гр", calories: 40 }, // 40 ккал/100г
  { id: 35, name: "Чеснок", count: 20, units: "гр", calories: 30 }, // 150 ккал/100г
  { id: 36, name: "Морковь", count: 150, units: "гр", calories: 62 }, // 41 ккал/100г
  { id: 37, name: "Картофель", count: 300, units: "гр", calories: 240 }, // 80 ккал/100г
  { id: 38, name: "Свёкла", count: 200, units: "гр", calories: 88 }, // 44 ккал/100г
  { id: 39, name: "Капуста белокочанная", count: 500, units: "гр", calories: 125 }, // 25 ккал/100г
  { id: 40, name: "Огурец свежий", count: 120, units: "гр", calories: 17 }, // 14 ккал/100г
  { id: 41, name: "Помидор", count: 150, units: "гр", calories: 27 }, // 18 ккал/100г
  { id: 42, name: "Перец болгарский", count: 180, units: "гр", calories: 54 }, // 30 ккал/100г
  { id: 43, name: "Баклажан", count: 250, units: "гр", calories: 63 }, // 25 ккал/100г
  { id: 44, name: "Кабачок", count: 300, units: "гр", calories: 51 }, // 17 ккал/100г
  { id: 45, name: "Тыква", count: 400, units: "гр", calories: 104 }, // 26 ккал/100г
  { id: 46, name: "Зелёный горошек", count: 150, units: "гр", calories: 105 }, // 70 ккал/100г (свежий)
  { id: 47, name: "Фасоль стручковая", count: 200, units: "гр", calories: 60 }, // 30 ккал/100г
  { id: 48, name: "Шампиньоны", count: 250, units: "гр", calories: 55 }, // 22 ккал/100г
  { id: 49, name: "Лук зелёный", count: 30, units: "гр", calories: 9 }, // 30 ккал/100г
  { id: 50, name: "Укроп", count: 10, units: "гр", calories: 4 }, // 40 ккал/100г
  { id: 51, name: "Петрушка", count: 15, units: "гр", calories: 5 }, // 36 ккал/100г
  { id: 52, name: "Кинза", count: 10, units: "гр", calories: 4 }, // 36 ккал/100г
  { id: 53, name: "Базилик", count: 5, units: "гр", calories: 2 }, // 36 ккал/100г
  { id: 54, name: "Орегано", count: 3, units: "гр", calories: 1 }, // 36 ккал/100г
  { id: 55, name: "Тимьян", count: 2, units: "гр", calories: 1 }, // 36 ккал/100г
  { id: 56, name: "Розмарин", count: 3, units: "гр", calories: 1 }, // 36 ккал/100г
  { id: 57, name: "Лавровый лист", count: 1, units: "гр", calories: 0 }, // 0 ккал
  { id: 58, name: "Перец чёрный молотый", count: 5, units: "гр", calories: 13 }, // 260 ккал/100г
  { id: 59, name: "Перец красный молотый", count: 3, units: "гр", calories: 9 }, // 300 ккал/100г
  { id: 60, name: "Корица молотая", count: 2, units: "гр", calories: 6 }, // 300 ккал/100г
  { id: 61, name: "Гвоздика", count: 1, units: "гр", calories: 3 }, // 300 ккал/100г
  { id: 62, name: "Имбирь молотый", count: 3, units: "гр", calories: 9 }, // 300 ккал/100г
  { id: 63, name: "Куркума", count: 2, units: "гр", calories: 6 }, // 300 ккал/100г
  { id: 64, name: "Карри", count: 5, units: "гр", calories: 15 }, // 300 ккал/100г
  { id: 65, name: "Паприка", count: 4, units: "гр", calories: 12 }, // 300 ккал/100г
  { id: 66, name: "Тмин", count: 2, units: "гр", calories: 8 }, // 400 ккал/100г
  { id: 67, name: "Кориандр", count: 3, units: "гр", calories: 9 }, // 300 ккал/100г
  { id: 68, name: "Мускатный орех", count: 1, units: "гр", calories: 5 }, // 500 ккал/100г
  { id: 69, name: "Ванилин", count: 1, units: "гр", calories: 3 }, // 300 ккал/100г
  { id: 70, name: "Разрыхлитель теста", count: 10, units: "гр", calories: 0 }, // 0 ккал
  { id: 71, name: "Желатин", count: 15, units: "гр", calories: 51 }, // 340 ккал/100г
  { id: 72, name: "Кокосовая стружка", count: 50, units: "гр", calories: 330 }, // 660 ккал/100г
  { id: 73, name: "Миндальная мука", count: 100, units: "гр", calories: 600 }, // 600 ккал/100г
  { id: 74, name: "Кунжут", count: 30, units: "гр", calories: 180 }, // 600 ккал/100г
  { id: 75, name: "Семена льна", count: 40, units: "гр", calories: 200 }, // 500 ккал/100г
  { id: 76, name: "Семена подсолнечника", count: 60, units: "гр", calories: 360 }, // 600 ккал/100г
  { id: 77, name: "Изюм", count: 80, units: "гр", calories: 240 }, // 300 ккал/100г
  { id: 78, name: "Курага", count: 100, units: "гр", calories: 240 }, // 240 ккал/100г
  { id: 79, name: "Чернослив", count: 90, units: "гр", calories: 216 }, // 240 ккал/100г
  { id: 80, name: "Финики", count: 120, units: "гр", calories: 336 }, // 280 ккал/100г
  { id: 81, name: "Инжир сушёный", count: 70, units: "гр", calories: 210 }, // 300 ккал/100г
  { id: 82, name: "Орехи грецкие", count: 100, units: "гр", calories: 650 }, // 650 ккал/100г
  { id: 83, name: "Миндаль", count: 80, units: "гр", calories: 480 }, // 600 ккал/100г
  { id: 84, name: "Фундук", count: 90, units: "гр", calories: 567 }, // 630 ккал/100г
  { id: 85, name: "Кешью", count: 110, units: "гр", calories: 660 }, // 600 ккал/100г
  { id: 86, name: "Арахис", count: 100, units: "гр", calories: 550 }, // 550 ккал/100г
  { id: 87, name: "Фисташки", count: 70, units: "гр", calories: 420 }, // 600 ккал/100г
  { id: 88, name: "Бразильский орех", count: 60, units: "гр", calories: 420 }, // 700 ккал/100г
  { id: 89, name: "Кедровые орехи", count: 50, units: "гр", calories: 350 }, // 700 ккал/100г
  { id: 90, name: "Кукуруза консервированная", count: 200, units: "гр", calories: 180 }, // 90 ккал/100г
  { id: 91, name: "Горошек зелёный консервированный", count: 150, units: "гр", calories: 105 }, // 70 ккал/100г
  { id: 92, name: "Фасоль консервированная", count: 250, units: "гр", calories: 225 }, // 90 ккал/100г
  { id: 93, name: "Ананас консервированный", count: 300, units: "гр", calories: 180 }, // 60 ккал/100г
  { id: 94, name: "Персики консервированные", count: 280, units: "гр", calories: 168 }, // 60 ккал/100г
  { id: 95, name: "Шпроты в масле", count: 120, units: "гр", calories: 360 }, // 300 ккал/100г
  { id: 96, name: "Тунец консервированный", count: 180, units: "гр", calories: 180 }, // 100 ккал/100г (в собственном соку)
  { id: 97, name: "Лосось слабосолёный", count: 200, units: "гр", calories: 400 }, // 200 ккал/100г
  { id: 98, name: "Икра красная", count: 100, units: "гр", calories: 250 }, // 250 ккал/100г
  { id: 99, name: "Икра чёрная", count: 50, units: "гр", calories: 150 }, // 300 ккал/100г
  { id: 100, name: "Бананы", count: 1, units: "кг", calories: 890 }, // 89 ккал/100г
  { id: 101, name: "Куриная грудка", count: 300, units: "гр", calories: 495 },
  { id: 102, name: "Салат Айсберг", count: 200, units: "гр", calories: 28 },
  { id: 103, name: "Сухарики", count: 50, units: "гр", calories: 200 },
  { id: 104, name: "Сыр Пармезан", count: 30, units: "гр", calories: 120 },
  { id: 105, name: "Соус Цезарь", count: 50, units: "мл", calories: 250 },
  { id: 106, name: "Сыр Маскарпоне", count: 250, units: "гр", calories: 1000 },
  { id: 107, name: "Кофе эспрессо", count: 100, units: "мл", calories: 2 },
  { id: 108, name: "Печенье Савоярди", count: 150, units: "гр", calories: 525 },
  { id: 109, name: "Какао-порошок", count: 20, units: "гр", calories: 80 },
  { id: 110, name: "Ликёр Амаретто", count: 30, units: "мл", calories: 105 },
  { id: 111, name: "Авокадо", count: 200, units: "гр", calories: 320 },
  { id: 112, name: "Киви", count: 100, units: "гр", calories: 61 },
  { id: 113, name: "Манго", count: 300, units: "гр", calories: 180 },
  { id: 114, name: "Гранат", count: 250, units: "гр", calories: 175 },
  { id: 115, name: "Виноград", count: 150, units: "гр", calories: 105 },
  { id: 116, name: "Груша", count: 180, units: "гр", calories: 101 },
  { id: 117, name: "Яблоко", count: 200, units: "гр", calories: 104 },
  { id: 118, name: "Персик", count: 150, units: "гр", calories: 59 },
  { id: 119, name: "Абрикос", count: 100, units: "гр", calories: 48 },
  { id: 120, name: "Слива", count: 120, units: "гр", calories: 46 },
  { id: 121, name: "Вишня", count: 150, units: "гр", calories: 75 },
  { id: 122, name: "Черешня", count: 200, units: "гр", calories: 100 },
  { id: 123, name: "Арбуз", count: 500, units: "гр", calories: 150 },
  { id: 124, name: "Дыня", count: 400, units: "гр", calories: 136 },
  { id: 125, name: "Апельсин", count: 250, units: "гр", calories: 122 },
  { id: 126, name: "Мандарин", count: 200, units: "гр", calories: 106 },
  { id: 127, name: "Лимон", count: 100, units: "гр", calories: 29 },
  { id: 128, name: "Лайм", count: 80, units: "гр", calories: 30 },
  { id: 129, name: "Грейпфрут", count: 300, units: "гр", calories: 105 },
  { id: 130, name: "Ананас", count: 400, units: "гр", calories: 200 },
  { id: 131, name: "Клубника", count: 150, units: "гр", calories: 49 },
  { id: 132, name: "Малина", count: 120, units: "гр", calories: 52 },
  { id: 133, name: "Черника", count: 100, units: "гр", calories: 57 },
  { id: 134, name: "Ежевика", count: 150, units: "гр", calories: 66 },
  { id: 135, name: "Клюква", count: 100, units: "гр", calories: 46 },
  { id: 136, name: "Смородина чёрная", count: 120, units: "гр", calories: 63 },
  { id: 137, name: "Смородина красная", count: 100, units: "гр", calories: 56 },
  { id: 138, name: "Крыжовник", count: 150, units: "гр", calories: 66 },
  { id: 139, name: "Облепиха", count: 100, units: "гр", calories: 82 },
  { id: 140, name: "Шиповник", count: 50, units: "гр", calories: 162 },
  { id: 141, name: "Рябина", count: 100, units: "гр", calories: 50 },
  { id: 142, name: "Брусника", count: 120, units: "гр", calories: 46 },
  { id: 143, name: "Голубика", count: 150, units: "гр", calories: 85 },
  { id: 144, name: "Бузина", count: 100, units: "гр", calories: 73 },
  { id: 145, name: "Физалис", count: 80, units: "гр", calories: 53 },
  { id: 146, name: "Фейхоа", count: 100, units: "гр", calories: 49 },
  { id: 147, name: "Хурма", count: 200, units: "гр", calories: 134 },
  { id: 148, name: "Кизил", count: 100, units: "гр", calories: 44 },
  { id: 149, name: "Шелковица", count: 150, units: "гр", calories: 53 },
  { id: 150, name: "Айва", count: 300, units: "гр", calories: 57 },
  { id: 151, name: "Ревень", count: 200, units: "гр", calories: 21 },
  { id: 152, name: "Инжир", count: 150, units: "гр", calories: 74 },
  { id: 153, name: "Папайя", count: 300, units: "гр", calories: 119 },
  { id: 154, name: "Гуава", count: 200, units: "гр", calories: 68 },
  { id: 155, name: "Карамбола", count: 150, units: "гр", calories: 31 },
  { id: 156, name: "Питайя", count: 250, units: "гр", calories: 60 },
  { id: 157, name: "Личи", count: 100, units: "гр", calories: 66 },
  { id: 158, name: "Рамбутан", count: 120, units: "гр", calories: 68 },
  { id: 159, name: "Мангостин", count: 100, units: "гр", calories: 73 },
  { id: 160, name: "Дуриан", count: 300, units: "гр", calories: 357 },
  { id: 161, name: "Саподилла", count: 200, units: "гр", calories: 83 },
  { id: 162, name: "Лонган", count: 100, units: "гр", calories: 60 },
  { id: 163, name: "Кумкват", count: 80, units: "гр", calories: 71 },
  { id: 164, name: "Помело", count: 400, units: "гр", calories: 152 },
  { id: 165, name: "Юзу", count: 100, units: "гр", calories: 53 },
  { id: 166, name: "Бергамот", count: 80, units: "гр", calories: 36 },
  { id: 167, name: "Цитрон", count: 150, units: "гр", calories: 34 },
  { id: 168, name: "Померанец", count: 200, units: "гр", calories: 53 },
  { id: 169, name: "Кивано", count: 250, units: "гр", calories: 44 },
  { id: 170, name: "Тамарилло", count: 150, units: "гр", calories: 50 },
  { id: 171, name: "Черёмуха", count: 100, units: "гр", calories: 100 },
  { id: 172, name: "Арония", count: 120, units: "гр", calories: 55 },
  { id: 173, name: "Ирга", count: 150, units: "гр", calories: 45 },
  { id: 174, name: "Жимолость", count: 100, units: "гр", calories: 41 },
  { id: 175, name: "Калина", count: 120, units: "гр", calories: 26 },
  { id: 176, name: "Морошка", count: 100, units: "гр", calories: 40 },
  { id: 177, name: "Черёмуха", count: 150, units: "гр", calories: 100 },
  { id: 178, name: "Костяника", count: 100, units: "гр", calories: 40 },
  { id: 179, name: "Княженика", count: 120, units: "гр", calories: 41 },
  { id: 180, name: "Годжи", count: 50, units: "гр", calories: 180 },
  { id: 181, name: "Физалис овощной", count: 200, units: "гр", calories: 32 },
  { id: 182, name: "Артишок", count: 300, units: "гр", calories: 47 },
  { id: 183, name: "Спаржа", count: 200, units: "гр", calories: 40 },
  { id: 184, name: "Брокколи", count: 250, units: "гр", calories: 85 },
  { id: 185, name: "Цветная капуста", count: 300, units: "гр", calories: 75 },
  { id: 186, name: "Брюссельская капуста", count: 200, units: "гр", calories: 86 },
  { id: 187, name: "Кольраби", count: 250, units: "гр", calories: 108 },
  { id: 188, name: "Редис", count: 100, units: "гр", calories: 16 },
  { id: 189, name: "Редька", count: 150, units: "гр", calories: 36 },
  { id: 190, name: "Репа", count: 200, units: "гр", calories: 56 },
  { id: 191, name: "Брюква", count: 250, units: "гр", calories: 90 },
  { id: 192, name: "Топинамбур", count: 200, units: "гр", calories: 110 },
  { id: 193, name: "Пастернак", count: 150, units: "гр", calories: 75 },
  { id: 194, name: "Сельдерей корневой", count: 200, units: "гр", calories: 42 },
  { id: 195, name: "Сельдерей стеблевой", count: 150, units: "гр", calories: 24 },
  { id: 196, name: "Фенхель", count: 200, units: "гр", calories: 73 },
  { id: 197, name: "Руккола", count: 50, units: "гр", calories: 12 },
  { id: 198, name: "Шпинат", count: 100, units: "гр", calories: 23 },
  { id: 199, name: "Щавель", count: 80, units: "гр", calories: 22 },
  { id: 200, name: "Кресс-салат", count: 50, units: "гр", calories: 11 },
  { id: 201, name: "Лук-порей", count: 150, units: "гр", calories: 61 },
  { id: 202, name: "Лук-шалот", count: 100, units: "гр", calories: 72 },
  { id: 203, name: "Черемша", count: 80, units: "гр", calories: 35 },
  { id: 204, name: "Чеснок молодой", count: 50, units: "гр", calories: 80 },
  { id: 205, name: "Имбирь свежий", count: 30, units: "гр", calories: 24 },
  { id: 206, name: "Куркума свежая", count: 20, units: "гр", calories: 16 },
  { id: 207, name: "Хрен", count: 40, units: "гр", calories: 28 },
  { id: 208, name: "Каперсы", count: 30, units: "гр", calories: 23 },
  { id: 209, name: "Оливки зелёные", count: 50, units: "гр", calories: 69 },
  { id: 210, name: "Оливки чёрные", count: 50, units: "гр", calories: 81 },
  { id: 211, name: "Соевый соус", count: 30, units: "мл", calories: 18 },
  { id: 212, name: "Вустерширский соус", count: 20, units: "мл", calories: 13 },
  { id: 213, name: "Табаско", count: 10, units: "мл", calories: 3 },
  { id: 214, name: "Бальзамический уксус", count: 25, units: "мл", calories: 29 },
  { id: 215, name: "Яблочный уксус", count: 30, units: "мл", calories: 6 },
  { id: 216, name: "Вино белое сухое", count: 100, units: "мл", calories: 82 },
  { id: 217, name: "Вино красное сухое", count: 100, units: "мл", calories: 85 },
  { id: 218, name: "Пиво светлое", count: 500, units: "мл", calories: 210 },
  { id: 219, name: "Пиво тёмное", count: 500, units: "мл", calories: 250 },
  { id: 220, name: "Шампанское", count: 150, units: "мл", calories: 129 },
  { id: 221, name: "Водка", count: 50, units: "мл", calories: 120 },
  { id: 222, name: "Виски", count: 50, units: "мл", calories: 123 },
  { id: 223, name: "Ром", count: 50, units: "мл", calories: 121 },
  { id: 224, name: "Джин", count: 50, units: "мл", calories: 122 },
  { id: 225, name: "Текила", count: 50, units: "мл", calories: 124 },
  { id: 226, name: "Коньяк", count: 50, units: "мл", calories: 125 },
  { id: 227, name: "Бренди", count: 50, units: "мл", calories: 126 }
];