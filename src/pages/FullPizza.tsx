import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Loader from '../components/Loader/Loader';
import { TPizzaType } from '../utils/types/types';

const FullPizza: FC = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState<TPizzaType | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://64247d6f9e0a30d92b1d3695.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('error')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    return (
        <div className='container' style={{ flexDirection: 'column', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            {pizza
                ? <><h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>{pizza?.title}</h2>
                    <PizzaBlock pizza={pizza} />
                    <button className='button' type='button' onClick={() => { navigate(-1) }}>Вернуться назад &larr;</button></>
                : <Loader />
            }
        </div>
    );
};

export default FullPizza;