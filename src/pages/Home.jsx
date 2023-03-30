import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';

const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://64247d6f9e0a30d92b1d3695.mockapi.io/items')
            .then((response) => response.json())
            .then((items) => {
                setPizzas(items);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='container'>
            <div class="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
                {isLoading
                    ? [...new Array(12)].map((_, index) => { return <Skeleton key={index} /> })
                    : pizzas.map((pizza) => {
                        return <PizzaBlock pizza={pizza} key={pizza.id} />
                    })
                }
            </div>
        </div>
    );
};

export default Home;