import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import { useContext, useState } from 'react';

export const appContext = React.createContext('')

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div class="wrapper">
      <appContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div class="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
      </appContext.Provider>
    </div>
  );
}

export default App;
