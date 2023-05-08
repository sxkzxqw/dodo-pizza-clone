import React, { FC, useEffect } from 'react';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { TPizzaType } from '../utils/types/types';

const Home: FC = () => {
    const searchValue = useSelector((state: any) => state.searchValue.value)
    const sortType = useSelector((state: any) => state.filters.sort.sortProperty)
    const isLoading = useSelector((state: any) => state.pizza.isLoading)

    const dispatch = useDispatch()
    const categoryId = useSelector((state: any) => state.filters.categoryId)
    const currentPage = useSelector((state: any) => state.filters.pageCount)

    const pizzas = useSelector((state: any) => state.pizza.items)

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
            //@ts-ignore
            fetchPizzas({
                order,
                search,
                currentPage,
                categoryId,
                sortType
            }))
        window.scrollTo(0, 0)
    }

    const onClickCategory = (index: number) => {
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