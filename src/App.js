import './App.css';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';
import { useEffect, useState } from 'react';

function App() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('https://64247d6f9e0a30d92b1d3695.mockapi.io/items')
    .then((response) => response.json())
    .then((items) => {
      setPizzas(items);
    })
  }, [])
  
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {
              pizzas.map((pizza) => {
                return <PizzaBlock pizza={pizza} key={pizza.id} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
