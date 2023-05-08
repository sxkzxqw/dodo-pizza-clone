import React, { FC, useState } from 'react';

type TCategoriesProps = {
  value: number;
  onClickCategory: any;
}

const Categories: FC<TCategoriesProps> = ({ value, onClickCategory }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => {
            return <li className={value === index ? 'active' : ''} onClick={() => onClickCategory(index)} key={index}>
              {category}
            </li>
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
