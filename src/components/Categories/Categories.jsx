import React, { useState } from 'react';

const Categories = ({ value, onClickCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
