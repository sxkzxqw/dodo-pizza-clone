import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination/Pagination';

const Home = ({ searchValue }) => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    const items = pizzas.map((pizza) => {
        return <PizzaBlock pizza={pizza} key={pizza.id} />
    })

    const skeletons = [...new Array(12)].map((_, index) => { return <Skeleton key={index} /> })

    useEffect(() => {
        setIsLoading(true);
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `search=${searchValue}` : '';

        fetch(`https://64247d6f9e0a30d92b1d3695.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
            }${search}&sortBy=${sortType.sortProperty.replace('-', '')}&order=${order}`)
            .then((response) => response.json())
            .then((items) => {
                setPizzas(items);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    const onClickCategory = (index) => {
        setCategoryId(index);
    };

    return (
        <div className='container'>
            <div class="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
            </div>
            <h2 class="content__title">Все пиццы</h2>
            <div class="content__items">
                {isLoading
                    ? skeletons
                    : items
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
};

export default Home;