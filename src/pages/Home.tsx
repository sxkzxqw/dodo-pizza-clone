import React, { FC, useCallback, useEffect } from 'react';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { TPizzaType } from '../utils/types/types';
import { useAppDispatch, useAppSelector } from '../utils/redux-utils/redux-utils';

const Home: FC = () => {
    const searchValue = useAppSelector((state) => state.searchValue.value)
    const sortType = useAppSelector((state) => state.filters.sort.sortProperty)
    const isLoading = useAppSelector((state) => state.pizza.isLoading)

    const dispatch = useAppDispatch()
    const categoryId = useAppSelector((state) => state.filters.categoryId)
    const currentPage = useAppSelector((state) => state.filters.pageCount)

    const pizzas = useAppSelector((state) => state.pizza.items)

    const items = pizzas.map((pizza: TPizzaType) => {
        return (
            <PizzaBlock pizza={pizza} key={pizza.id} />
        )
    })

    const skeletons = [...new Array(12)].map((_, index) => { return <Skeleton key={index} /> })

    const onChangePage = (number: number) => {
        dispatch(setPageCount(number))
    }

    useEffect(() => {
        getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `search=${searchValue}` : '';
        dispatch(
            fetchPizzas({
                order,
                search,
                currentPage,
                categoryId,
                sortType
            }))
        window.scrollTo(0, 0)
    }

    const onClickCategory = useCallback((index: number) => {
        dispatch(setCategoryId(index))
    }, []);

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
            {/* -pagination caused because server cant give all items <Pagination currentPage={currentPage} onChangePage={onChangePage} />  */}
        </div>
    );
};

export default Home;