import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              className={value === index ? 'active' : ''}
              key={index}
              onClick={() => onClickCategory(index)}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
