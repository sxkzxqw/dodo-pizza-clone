import React, { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div class="categories">
      <ul>
        {
          categories.map((category, index) => {
            return <li className={activeIndex === index ? 'active' : ''} onClick={() => onClickCategory(index)} key={index}>
              {category}
            </li>
          })
        }
      </ul>
    </div>
  );
};

export default Categories;
