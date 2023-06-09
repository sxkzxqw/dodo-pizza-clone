import React, { FC, useState } from 'react';
import { addItem } from '../../redux/slices/cartSlice';
import { Link, useLocation } from 'react-router-dom';
import { TPizzaType } from '../../utils/types/types';
import { useAppDispatch, useAppSelector } from '../../utils/redux-utils/redux-utils';

type TPizzaBlock = {
  pizza: TPizzaType
}

const typeNames = ['тонкое', 'традиционное']

const PizzaBlock: FC<TPizzaBlock> = ({ pizza }) => {
  const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.id === pizza.id))
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const dispatch = useAppDispatch()
  const location = useLocation()

  const addedCount = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item = {
      ...pizza,
      size: pizza.sizes[activeSize],
      type: typeNames[activeType]
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className="pizza-block">
        {location.pathname.includes('pizza')
          ? <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt={pizza.title}
          />
          : <Link to={`/pizza/${pizza.id}`}>
            <img
              className="pizza-block__image"
              src={pizza.imageUrl}
              alt={pizza.title}
            />
          </Link>
        }
        <h4 className="pizza-block__title">{pizza.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {
              pizza.types.map((type, index) => {
                return <li className={activeType === index ? 'active' : ''} onClick={() => { setActiveType(index) }} key={index}>{typeNames[type]}</li>
              })
            }
          </ul>
          <ul>
            {
              pizza.sizes.map((size, index) => {
                return <li className={activeSize === index ? 'active' : ''} onClick={() => { setActiveSize(index) }} key={index}>{size} см.</li>
              })
            }
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {pizza.price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
