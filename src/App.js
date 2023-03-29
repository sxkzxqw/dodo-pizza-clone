import './App.css';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';
import pizzas from './components/pizzas.json';

function App() {
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
