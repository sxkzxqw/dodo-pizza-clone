import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';
import Pagination from '../components/Pagination/Pagination';
import { appContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import axios from 'axios';
import { fetchPizzas, setItems } from '../redux/slices/pizzasSlice';

const Home = () => {
    const searchValue = useSelector((state) => state.searchValue.value)
    const sortType = useSelector((state) => state.filters.sort.sortProperty)
    const isLoading = useSelector((state) => state.pizza.isLoading)

    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filters.categoryId)
    const currentPage = useSelector((state) => state.filters.pageCount)

    const pizzas = useSelector((state) => state.pizza.items)

    const items = pizzas.map((pizza) => {
        return (
            <PizzaBlock pizza={pizza} key={pizza.id} />
        )
    })

    const skeletons = [...new Array(12)].map((_, index) => { return <Skeleton key={index} /> })

    const onChangePage = (number) => {
        dispatch(setPageCount(number))
    }

    useEffect(() => {
        getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `search=${searchValue}` : '';
        dispatch(fetchPizzas({
            order,
            search,
            currentPage,
            categoryId,
            sortType
        }))
        window.scrollTo(0, 0)
    }

    const onClickCategory = (index) => {
        dispatch(setCategoryId(index))
    };

    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletons
                    : items
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;