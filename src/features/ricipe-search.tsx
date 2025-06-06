import '../widgets/search-bar/SearchBar.css';
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { RecipeType } from '../entities/data';
import { useNavigate, useParams } from 'react-router-dom';

interface RecipeSearchProps {
  recipes?: RecipeType[];
  onSelectRecipe: (recipe: RecipeType | null) => void;
}

interface OptionType {
  value: number;
  label: string;
  recipe: RecipeType;
}

export default function RecipeSearch({ recipes, onSelectRecipe }: RecipeSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { category } = useParams();

  const handleClick = (recipe: RecipeType) => {
    navigate(`/${category || 'all'}/recipe/${recipe.id}`);
  };

  if (!recipes || !Array.isArray(recipes)) {
    return;
  }


  // Формируем опции для Select с проверкой
  const options: OptionType[] = recipes.map((recipe) => ({
    value: recipe.id,
    label: `${recipe.name} (${typeof recipe.category === 'function' ? recipe.category() : recipe.category})`,
    recipe,
  }));

  // Фильтрация опций по поисковому запросу
  const filteredOptions = options.filter((option) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return option.label.toLowerCase().includes(lowerSearchTerm);
  });

  const customStyles: StylesConfig<OptionType> = {
    control: (base) => ({
      ...base,
      borderRadius: '10px',
    }),
    option: (base) => ({
      ...base,
      cursor: 'pointer',
      ':active': {
        ...base[':active'],
        backgroundColor: 'transparent',
        borderColor: 'orange',
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    input: (base) => ({
      ...base,
      color: 'black',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'grey',
    }),
  };

  return (
    <div className='panel' style={{ color: 'black' }}>
      <Select<OptionType>
        classNamePrefix="react-select"
        options={filteredOptions}
        onInputChange={(inputValue) => setSearchTerm(inputValue)}
        onChange={(selectedOption) => {
          if (selectedOption) {
            handleClick(selectedOption.recipe);
            onSelectRecipe(selectedOption.recipe);
          } else {
            onSelectRecipe(null);
          }
        }}
        placeholder="Поиск рецептов или ингредиентов..."
        noOptionsMessage={() => 'Ничего не найдено'}
        isClearable
        isSearchable
        menuPortalTarget={document.body}
        styles={customStyles}
        menuPosition="fixed"
      />
    </div>
  );
}