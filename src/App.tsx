import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import FullPizza from './pages/FullPizza';
import MainLayout from './Layouts/MainLayout';

export const appContext = React.createContext('')

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
}

export default App;
