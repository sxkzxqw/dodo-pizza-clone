import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination/Pagination';
import { appContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
    const { searchValue } = React.useContext(appContext)
    const sortType = useSelector((state) => state.filters.sort.sortProperty)

    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch()
    const categoryId = useSelector((state) => state.filters.categoryId)
    const [currentPage, setCurrentPage] = useState(1);

    const items = pizzas.map((pizza) => {
        return <PizzaBlock pizza={pizza} key={pizza.id} />
    })

    const skeletons = [...new Array(12)].map((_, index) => { return <Skeleton key={index} /> })

    useEffect(() => {
        setIsLoading(true);
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `search=${searchValue}` : '';

        fetch(`https://64247d6f9e0a30d92b1d3695.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
            }${search}&sortBy=${sortType.replace('-', '')}&order=${order}`)
            .then((response) => response.json())
            .then((items) => {
                setPizzas(items);
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

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
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
};

export default Home;