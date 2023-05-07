import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Loader from '../components/Loader/Loader';

const FullPizza = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState(null);
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
        <div className='container'>
            <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>{pizza?.title}</h2>
            {pizza
                ? <PizzaBlock pizza={pizza} />
                : <Loader />
            }
        </div>
    );
};

export default FullPizza;